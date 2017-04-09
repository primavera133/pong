import config from 'config'
import CookieAuth from 'hapi-auth-cookie'
import Player from '../models/player'
import {authValidationSchema} from '../../validators/auth'
import {setPlayer, hashPwd} from '../helpers/authHelper';
import Boom from 'boom';

const login = (request, reply) => {
  const {email, password} = request.payload
  if (!email || !password) {
    return reply(Boom.expectationFailed('Missing email or password'))
  }

  if (email === config.get('auth.email') && password === config.get('auth.password')) {
    //admin

    setPlayer({
      request,
      _id: '',
      name: 'admin',
      email,
      scope: 'admin'
    });

    reply({email})
  } else {
    // players
    const validatedPayload = authValidationSchema.validate(request.payload)
    if (validatedPayload.error) {
      return reply(Boom.unauthorized(validatedPayload.error))
    }

    const {email, password} = validatedPayload.value;
    Player.find({email: email}, (error, players) => {
      if (error) {
        return reply(Boom.badGateway(error))
      }

      players.filter((player) => {
        return player.password === hashPwd(password, player.passwordSalt1, player.passwordSalt2)
      })

      if (players.length === 0) {
        return reply(Boom.expectationFailed('Wrong email or password'))
      }

      setPlayer({
        request,
        _id: players[0]._id,
        name: players[0].name,
        email,
        scope: 'player'
      });
      reply({email})

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

    server.app.cache = server.cache({segment: 'sessions', expiresIn: config.get('auth.ttl')});

    server.auth.strategy('session', 'cookie', {
      password: config.get('auth.key'),
      cookie: 'sid-ratatoskify',
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
