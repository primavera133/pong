import Joi from 'joi'
import {gameValidationSchema} from './game'

export const playerValidationSchema = Joi.object().keys({
    name: Joi
        .string()
        .required(),
    password: Joi
        .string()
        .required(),
    email: Joi
        .string()
        .required(),
    phone: Joi
        .string()
        .optional(),
    games: Joi
        .array()
        .items(gameValidationSchema)
        .optional()
}).options({
    stripUnknown: true,
    allowUnknown: true
});
