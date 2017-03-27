import Games from '../games/games'
import { idValidationSchema } from '../../validators/basic';
import Boom from 'boom';

const getGameList = (request, reply) => {
  return reply(Games)
}

const getGame = (request, reply) => {
  const game = Games.find(game => {
    return game._id === request.params.id
  });

  if (game) return reply(game);

  reply(Boom.notFound());
}

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/api/games/{id}',
      config: {
        handler: getGame,
        auth: 'session',
        validate: {
          params: idValidationSchema
        }
      }
    },

    {
      method: 'GET',
      path: '/api/games',
      config: {
        handler: getGameList,
        auth: 'session',
      }
    }

  ])

  next()
}

exports.register.attributes = {
  name: 'games'
}
