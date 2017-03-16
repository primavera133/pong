import Player from '../models/player'
import {idValidationSchema} from '../../validators/id';
import {playerValidationSchema} from '../../validators/player';
import {setPlayer} from '../helpers/authHelper';

const getPlayer = (request, reply) => {
  Player.findById(request.params.id, (error, items) => {
    if (error) return reply(error).code(500)

    return reply(items).code(200)
  })
}

const signUpPlayer = (request, reply) => {
  const validatedPayload = playerValidationSchema.validate(request.payload)
  if (validatedPayload.error) {
    return reply().redirect(error).code(500);
  }
  const player = new Player(validatedPayload.value)
  player.save(error => {
    if (error) {
      if (error.code === 11000) {
        //duplicate unique entry, would be the email field in this case
        return reply({error: error.message, code: error.code, field: 'email'}).code(409)
      }
      return reply({error: error.message, code: error.code}).code(400)
    }

    const {email} = validatedPayload.value;

    setPlayer({request, email, scope: 'player'})

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
