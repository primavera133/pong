import Joi from 'joi'

export const playerFriendValidationSchema = Joi.object().keys({
  name: Joi
    .string()
    .trim()
}).options({
  stripUnknown: true,
  allowUnknown: true
});
