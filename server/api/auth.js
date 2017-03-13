import config from 'config'
import CookieAuth from 'hapi-auth-cookie'
import Player from '../models/player'
import {authValidationSchema} from '../../validators/auth'

const login = (request, reply) => {
  if (!request.payload.email || !request.payload.password) {
    return reply({message: 'Missing email or password'}).code(401)
  }

  //admin
  if (request.payload.email === config.get('auth.email') &&
    request.payload.password === config.get('auth.password')) {

    const {email} = request.payload;

    request.cookieAuth.set({email})

    reply({email}).code(200)
  } else {
    const validatedPayload = authValidationSchema.validate(request.payload)
    if (validatedPayload.error) {
      return reply().redirect(error).code(500);
    }

    const {email, password} = validatedPayload.value;

    Player.find({email: email, password: password}, (error, players) => {
      if (error || players.length === 0) {
        return reply({message: 'Wrong email or password'}).code(401)
      }

      request.cookieAuth.set({email})

      reply({email}).code(200)
    });
  }
}

const logout = (request, reply) => {
  request.cookieAuth.clear()
  reply({message: 'auth/logout'})
}

exports.register = (server, options, next) => {
  server.register(CookieAuth, (error) => {
    if (error) throw error

    server.auth.strategy('session', 'cookie', {
      password: config.get('auth.key'),
      isSecure: process.env.NODE_ENV === 'production',
      isHttpOnly: true
    })

    server.route([
      {
        method: 'POST',
        path: '/auth/login',
        config: {
          handler: login,
          auth: {
            mode: 'try',
            strategy: 'session'
          },
          plugins: {
            'hapi-auth-cookie': {
              redirectTo: false
            }
          }
        }
      },

      {
        method: 'GET',
        path: '/auth/logout',
        config: {
          handler: logout,
          auth: 'session'
        }
      }
    ])

    next()
  })
}

exports.register.attributes = {
  name: 'auth'
}
