import Player from '../models/player'
import {idValidationSchema} from '../../validators/id';
import {playerValidationSchema} from '../../validators/player';

const getPlayer = (request, reply) => {
    Player.findById(request.params.id, (error, items) => {
        if (error) return reply(error).code(500)

        return reply(items).code(200)
    })
}

const addPlayer = (request, reply) => {
    const validatedPayload = playerValidationSchema.validate(request.payload)
    if (validatedPayload.error) {
        return reply().redirect(error).code(500);
    }

    const player = new Player(validatedPayload.value)
    player.save(error => {
        if (error) return reply({error: error.message}).code(400)

        return reply(player).code(200)
    })
}

const updateGame = (request, reply) => {
    Player.findOne({_id: request.params.id}, (error, game) => {
        if (error) return reply(error).code(500)

        const validatedPayload = playerValidationSchema.validate(request.payload)
        if (validatedPayload.error) {
            return reply().redirect(error).code(500);
        }

        const i = Object.assign(game, validatedPayload.value)
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
                handler: addPlayer,
                auth: 'session'
            }
        },

        {
            method: 'PUT',
            path: '/api/players/{id}',
            config: {
                handler: updateGame,
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
