import Match from '../models/match'
import { idValidationSchema } from '../../validators/basic';
import { matchValidationSchema, matchStartValidationSchema } from '../../validators/match';
import Boom from 'boom';
import moment from 'moment'

const getMatchList = (request, reply) => {
  const query = {
    $or: [
      {
        'playerOne.playerId': request.auth.credentials._id
      }, {
        'playerTwo.playerId': request.auth.credentials._id
      }
    ],
    updatedAt: {
      $gt: moment().subtract(1, 'week').toDate()
    }
  };
  Match.find(query, (error, matches) => {
    if (error) return reply(Boom.badGateway(error))
    return reply(matches)
  })
}

const getMatch = (request, reply) => {
  Match.findById(request.params.id, (error, match) => {
    if (error) return reply(Boom.badGateway(error))
    if (match === null) return reply(Boom.notFound())

    return reply(match)
  })
}

const addMatch = (request, reply) => {
  const validatedPayload = matchStartValidationSchema.validate(request.payload)
  if (validatedPayload.error) {
    return reply(Boom.badData(validatedPayload.error));
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
    if (error) return reply(Boom.badGateway(error.message))

    return reply(match)
  })
}

const updateMatch = (match, request, reply) => {
  Match.findOne({ _id: request.params.id }, (error, match) => {
    if (error) return reply(Boom.badGateway(error))

    const validatedPayload = matchValidationSchema.validate(request.payload)
    if (validatedPayload.error) {
      return reply(Boom.badData(error));
    }

    const i = Object.assign(match, validatedPayload.value)
    console.log(i)
    i.save((error, doc) => {
      if (error) {
        console.log('error', error)
        return reply(Boom.badGateway(error.message))
      }

      return reply(doc)
    })
  })
}

const cancelMatch = (request, reply) => {
  const matchId = request.params.id;
  const query = { _id: matchId, 'playerTwo.playerId': request.auth.credentials._id };

  Match.findOne(query, (error, match) => {
    if (error) return reply(Boom.badGateway(error))
    if (match === null) return reply(Boom.notFound(error))

    const _match = Object.assign(match, { rejected: true })
    _match.save((error, doc) => {
      if (error) {
        return reply(Boom.badGateway(error.message))
      }

      return reply(doc)
    })
  })
}

const acceptMatch = (request, reply) => {
  const matchId = request.params.id;
  const query = { _id: matchId, 'playerTwo.playerId': request.auth.credentials._id };

  Match.findOne(query, (error, match) => {
    if (error) return reply(Boom.badGateway(error))
    if (match === null) return reply(Boom.notFound(error))

    const turn = Math.random() < 0.5 ? 'playerOne' : 'playerTwo';

    const _match = Object.assign(match, { accepted: true, turn: turn })
    _match.save((error, doc) => {
      if (error) {
        console.log('error', error)
        return reply(Boom.badGateway(error.message))
      }

      return reply(doc)
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
      path: '/api/matches/{id}',
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
      path: '/api/matches/{id}/cancel',
      config: {
        handler: cancelMatch,
        auth: 'session',
        validate: {
          params: idValidationSchema
        }
      }
    },

    {
      method: 'PUT',
      path: '/api/matches/{id}/accept',
      config: {
        handler: acceptMatch,
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
