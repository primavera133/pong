import Games from '../../games/games'

const getGameList = (request, reply) => {
  return reply(Games)
}

exports.register = (server, options, next) => {
  server.route([
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
