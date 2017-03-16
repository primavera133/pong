import Joi from 'joi'
import {matchValidationSchema} from './match'

export const playerValidationSchema = Joi.object().keys({
  name: Joi
    .string()
    .trim()
    .required(),
  password: Joi
    .string()
    .min(8)
    .trim()
    .required(),
  passwordMatch: Joi
    .string()
    .min(8)
    .trim()
    .valid(Joi.ref('password')),
  email: Joi
    .string()
    .email()
    .trim()
    .required(),
  phone: Joi
    .string()
    .trim()
    .allow('')
    .optional(),
  games: Joi
    .array()
    .items(matchValidationSchema)
    .optional()
}).options({
  stripUnknown: true,
  allowUnknown: true
});


