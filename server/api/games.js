const games = [{_id: '1', name: 'Do the ping'}, {_id: '2', name: 'Do the pong'}];

const getGameList = (request, reply) => {
    return reply(games).code(200)
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
