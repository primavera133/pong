import { gameStateValidationSchema } from '../../../../validators/games/DwarfThrow/game'

const getGameState = (request, reply) => {
  reply({ ok: true })
}

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/api/games/dwarfthrow/{gameId}/{playerId}',
      config: {
        handler: getGameState,
        auth: 'session',
        validate: {
          params: gameStateValidationSchema
        }
      }
    }
  ])

  next()
}

exports.register.attributes = {
  name: 'gameDwarfThrow'
}
