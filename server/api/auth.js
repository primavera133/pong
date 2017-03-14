import config from 'config'
import CookieAuth from 'hapi-auth-cookie'
import Player from '../models/player'
import {authValidationSchema} from '../../validators/auth'

const login = (request, reply) => {
  if (!request.payload.email || !request.payload.password) {
    return reply({message: 'Missing email or password'}).code(417)
  }

  //admin
  if (request.payload.email === config.get('auth.email') &&
    request.payload.password === config.get('auth.password')) {

    const {email} = request.payload;

    request.cookieAuth.set({
      email: email,
      scope: 'admin'
    })

    reply({email}).code(200)
  } else {
    const validatedPayload = authValidationSchema.validate(request.payload)
    if (validatedPayload.error) {
      return reply({error: validatedPayload.error}).code(401);
    }

    const {email, password} = validatedPayload.value;

    Player.find({email: email, password: password}, (error, players) => {
      if (error || players.length === 0) {
        return reply({message: 'Wrong email or password'}).code(417)
      }
      const auth = {
        email: email,
        scope: 'player'
      }
      request.cookieAuth.set(auth)

      reply({email}).code(200)
    });
  }
}

const logout = (request, reply) => {
  request.cookieAuth.clear()
  reply({message: 'auth/logout'})
}

const ping = (request, reply) => {
  reply(request.auth.credentials);
};

exports.register = (server, options, next) => {
  server.register(CookieAuth, (error) => {
    if (error) throw error

    const cache = server.cache({ segment: 'sessions', expiresIn: config.get('auth.ttl') });
    server.app.cache = cache;

    server.auth.strategy('session', 'cookie', {
      password: config.get('auth.key'),
      cookie: 'sid-pong',
      isSecure: false
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
      },

      {
        method: 'GET',
        path: '/auth/ping',
        config: {
          handler: ping,
          auth: {
            mode: 'try',
            strategy: 'session'
          }
        }
      }
    ])

    next()
  })
}

exports.register.attributes = {
  name: 'auth'
}
