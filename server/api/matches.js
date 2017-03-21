import Match from '../models/match'
import {idValidationSchema} from '../../validators/basic';
import {matchValidationSchema, matchStartValidationSchema} from '../../validators/match';

const getMatchList = (request, reply) => {
  const query = {
    $or: [
      {
        'playerOne.playerId': request.auth.credentials._id
      }, {
        'playerTwo.playerId': request.auth.credentials._id
      }
    ]
  };
  Match.find(query, (error, matches) => {
    if (error) return reply(error).code(500)

    return reply(matches).code(200)
  })
}

const getMatch = (request, reply) => {
  Match.findById(request.params.matchId, (error, items) => {
    if (error) return reply(error).code(500)

    return reply(items).code(200)
  })
}

const addMatch = (request, reply) => {
  const validatedPayload = matchStartValidationSchema.validate(request.payload)
  if (validatedPayload.error) {
    return reply().redirect(error).code(500);
  }

  const match = new Match({
    playerOne: {
      playerId: request.auth.credentials._id,
      name: request.auth.credentials.name
    },
    playerTwo: {
      playerId: validatedPayload.value.opponent._id,
      name: validatedPayload.value.opponent.name,
      accepted: false
    },
    game: {
      gameId: validatedPayload.value.game._id,
      name: validatedPayload.value.game.name
    }
  })

  match.save(error => {
    if (error) return reply({error: error.message}).code(400)

    return reply(match).code(200)
  })
}

const updateMatch = (request, reply) => {
  Match.findOne({_id: request.params.id}, (error, match) => {
    if (error) return reply(error).code(500)

    const validatedPayload = matchValidationSchema.validate(request.payload)
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
      path: '/api/matches',
      config: {
        handler: getMatchList,
        auth: 'session',
      }
    },

    {
      method: 'GET',
      path: '/api/matches/{matchId}',
      config: {
        handler: getMatch,
        auth: 'session',
        validate: {
          params: idValidationSchema
        }
      }
    },

    {
      method: 'POST',
      path: '/api/matches',
      config: {
        handler: addMatch,
        auth: 'session'
      }
    },

    {
      method: 'PUT',
      path: '/api/matches/{matchId}',
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
  name: 'matches'
}
