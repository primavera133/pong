import Player from '../models/player'
import {idValidationSchema, nameValidationSchema} from '../../validators/basic';
import {playerValidationSchema} from '../../validators/player';
import {setPlayer} from '../helpers/authHelper';
import Boom from 'boom';

const getPlayer = (request, reply) => {
  Player.findById(request.params.id, (error, items) => {
    if (error) return reply(Boom.badGateway(error))

    return reply(items)
  })
}

const getPlayerFriends = (request, reply) => {
  Player.find({_id: request.auth.credentials._id}, {friends: true}, (error, players) => {
    if (error || !players.length) return reply(Boom.badGateway(error))

    return reply(players[0].friends)
  })
}

const findPlayerByName = (request, reply) => {
  const query = {$and: [{name: new RegExp(`.*${request.params.name}.*`, 'i')}, {name: {$ne: request.auth.credentials.name}}]}
  const limiter = {_id: true, name: true}

  Player.find(query, limiter, (error, players) => {
    if (error) return reply(Boom.badGateway(error))

    return reply(players)
  })
}

const signUpPlayer = (request, reply) => {
  const validatedPayload = playerValidationSchema.validate(request.payload)
  if (validatedPayload.error) {
    return reply().redirect(Boom.badData(error));
  }
  const player = new Player(validatedPayload.value)
  player.save((error, player) => {
    if (error) {
      if (error.code === 11000) {
        //duplicate unique entry, would be the name or email field in our case
        const query = {$or: [{name: validatedPayload.value.name}, {email: validatedPayload.value.email}]};
        return Player.find(query, (findError, players) => {
          if (findError) {
            return reply().redirect(Boom.badGateway(findError))
          }
          if (players) {
            for (let player of players) {
              if (player.name === validatedPayload.value.name) {
                return reply(Boom.conflict({error: error.message, code: error.code, field: 'name'}))
              }
              if (player.email === validatedPayload.value.email) {
                return reply(Boom.conflict({error: error.message, code: error.code, field: 'email'}))
              }
            }
          }
          return reply(Boom.badGateway({error: error.message, code: error.code}))
        })
      }
      return reply(Boom.badGateway({error: error.message, code: error.code}))
    }

    const {email} = validatedPayload.value;

    setPlayer({
      request,
      _id: player._id,
      name: player.name,
      email,
      scope: 'player'
    })

    return reply(player)
  })
}

const updateMatch = (request, reply) => {
  Player.findOne({_id: request.params.id}, (error, match) => {
    if (error) return reply(Boom.badGateway(error))

    const validatedPayload = playerValidationSchema.validate(request.payload)
    if (validatedPayload.error) {
      return reply().redirect(Boom.badData(error));
    }

    const i = Object.assign(match, validatedPayload.value)
    i.save((error, doc) => {
      if (error) return reply(Boom.badGateway(error.message))

      return reply(doc)
    })
  })
}

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/api/players/{id}',
      config: {
        handler: getPlayer,
        auth: 'session',
        validate: {
          params: idValidationSchema
        }
      }
    },

    {
      method: 'GET',
      path: '/api/players/friends',
      config: {
        handler: getPlayerFriends,
        auth: 'session'
      }
    },

    {
      method: 'GET',
      path: '/api/player/findbyname/{name}',
      config: {
        handler: findPlayerByName,
        auth: 'session',
        validate: {
          params: nameValidationSchema
        }
      }
    },

    {
      method: 'POST',
      path: '/api/players',
      config: {
        handler: signUpPlayer,
        auth: {
          mode: 'try',
          strategy: 'session'
        }
      }
    },

    {
      method: 'PUT',
      path: '/api/players/{id}',
      config: {
        handler: updateMatch,
        auth: 'session',
        validate: {
          params: idValidationSchema
        }
      }
    }

  ])

  next()
}

exports.register.attributes = {
  name: 'players'
}
