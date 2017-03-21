import Player from '../models/player'
import {idValidationSchema, nameValidationSchema} from '../../validators/basic';
import {playerValidationSchema} from '../../validators/player';
import {setPlayer} from '../helpers/authHelper';

const getPlayer = (request, reply) => {
  Player.findById(request.params.id, (error, items) => {
    if (error) return reply(error).code(500)

    return reply(items).code(200)
  })
}

const getPlayerFriends = (request, reply) => {
  Player.find({_id: request.auth.credentials._id}, {friends: true}, (error, players) => {
    if (error || !players.length) return reply(error).code(500)

    return reply(players[0].friends).code(200)
  })
}

const findPlayerByName = (request, reply) => {
  const query = {$and: [{name: new RegExp(`.*${request.params.name}.*`, 'i')}, {name: {$ne: request.auth.credentials.name}}]}
  const limiter = {_id: true, name: true}

  Player.find(query, limiter, (error, players) => {
    if (error) return reply(error).code(500)

    return reply(players).code(200)
  })
}

const signUpPlayer = (request, reply) => {
  const validatedPayload = playerValidationSchema.validate(request.payload)
  if (validatedPayload.error) {
    return reply().redirect(error).code(500);
  }
  const player = new Player(validatedPayload.value)
  player.save((error, player) => {
    if (error) {
      if (error.code === 11000) {
        //duplicate unique entry, would be the name or email field in our case
        const query = {$or: [{name: validatedPayload.value.name}, {email: validatedPayload.value.email}]};
        return Player.find(query, (findError, players) => {
          if (findError) {
            return reply().redirect(findError).code(500);
          }
          if (players) {
            for (let player of players) {
              if (player.name === validatedPayload.value.name) {
                return reply({error: error.message, code: error.code, field: 'name'}).code(409)
              }
              if (player.email === validatedPayload.value.email) {
                return reply({error: error.message, code: error.code, field: 'email'}).code(409)
              }
            }
          }
          return reply({error: error.message, code: error.code}).code(400)
        })
      }
      return reply({error: error.message, code: error.code}).code(400)
    }

    const {email} = validatedPayload.value;

    setPlayer({
      request,
      _id: player._id,
      name: player.name,
      email,
      scope: 'player'
    })

    return reply(player).code(200)
  })
}

const updateMatch = (request, reply) => {
  Player.findOne({_id: request.params.id}, (error, match) => {
    if (error) return reply(error).code(500)

    const validatedPayload = playerValidationSchema.validate(request.payload)
    if (validatedPayload.error) {
      return reply().redirect(error).code(500);
    }

    const i = Object.assign(match, validatedPayload.value)
    i.save((error, doc) => {
      if (error) return reply({error: error.message}).code(400)

      return reply(doc).code(200)
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
