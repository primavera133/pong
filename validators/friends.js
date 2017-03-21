import Joi from 'joi'
import {matchValidationSchema} from './match'

export const playerFriendValidationSchema = Joi.object().keys({
  name: Joi
    .string()
    .trim()
}).options({
  stripUnknown: true,
  allowUnknown: true
});
