import config from 'config'
import CookieAuth from 'hapi-auth-cookie'
import Player from '../models/player'
import { authValidationSchema } from '../../validators/auth'
import { setPlayer } from '../helpers/authHelper';
import Boom from 'boom';

const login = (request, reply) => {
	if (!request.payload.email || !request.payload.password) {
		return reply(Boom.expectationFailed('Missing email or password'))
	}

	//admin
	if (request.payload.email === config.get('auth.email') &&
		request.payload.password === config.get('auth.password')) {

		const { email } = request.payload;

		setPlayer({
			request,
			_id: '',
			name: 'admin',
			email,
			scope: 'admin'
		});

		reply({ email })
	} else {
		const validatedPayload = authValidationSchema.validate(request.payload)
		if (validatedPayload.error) {
			return reply(Boom.unauthorized(validatedPayload.error))
		}

		const { email, password } = validatedPayload.value;
		Player.findOne({ email: email, password: password }, (error, player) => {
			if (error) {
				return reply(Boom.badGateway(error))
			}
			if (player === null) {
				return reply(Boom.expectationFailed('Wrong email or password'))
			}
				setPlayer({
					request,
					_id: player._id,
					name: player.name,
					email,
					scope: 'player'
				});
				reply({ email })

		});
	}
}

const logout = (request, reply) => {
	request.cookieAuth.clear()
	reply({ message: 'auth/logout' })
}

const ping = (request, reply) => {
	reply(request.auth.credentials);
};

exports.register = (server, options, next) => {
	server.register(CookieAuth, (error) => {
		if (error) throw error

		server.app.cache = server.cache({ segment: 'sessions', expiresIn: config.get('auth.ttl') });

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
