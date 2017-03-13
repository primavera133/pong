import Game from '../models/game'
import {idValidationSchema} from '../../validators/id';
import {gameValidationSchema} from '../../validators/game';

const getGame = (request, reply) => {
  Game.findById(request.params.gameId, (error, items) => {
    if (error) return reply(error).code(500)

    return reply(items).code(200)
  })
}

const addGame = (request, reply) => {
  const validatedPayload = gameValidationSchema.validate(request.payload)
  if (validatedPayload.error) {
    return reply().redirect(error).code(500);
  }

  const game = new Game(validatedPayload.value)
  game.save(error => {
    if (error) return reply({error: error.message}).code(400)

    return reply(game).code(200)
  })
}

const updateGame = (request, reply) => {
  Game.findOne({_id: request.params.id}, (error, game) => {
    if (error) return reply(error).code(500)

    const validatedPayload = gameValidationSchema.validate(request.payload)
    if (validatedPayload.error) {
      return reply().redirect(error).code(500);
    }

    const i = Object.assign(game, validatedPayload.value)
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
      path: '/api/games/{gameId}',
      config: {
        handler: getGame,
        auth: 'session',
        validate: {
          params: idValidationSchema
        }
      }
    },

    {
      method: 'POST',
      path: '/api/games',
      config: {
        handler: addGame,
        auth: 'session'
      }
    },

    {
      method: 'PUT',
      path: '/api/games/{gameId}',
      config: {
        handler: updateGame,
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
  name: 'games'
}
