import Match from '../models/match'
import {idValidationSchema} from '../../validators/id';
import {matchValidationSchema} from '../../validators/match';

const getMatch = (request, reply) => {
  Match.findById(request.params.matchId, (error, items) => {
    if (error) return reply(error).code(500)

    return reply(items).code(200)
  })
}

const addMatch = (request, reply) => {
  const validatedPayload = matchValidationSchema.validate(request.payload)
  if (validatedPayload.error) {
    return reply().redirect(error).code(500);
  }

  const match = new Match(validatedPayload.value)
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
