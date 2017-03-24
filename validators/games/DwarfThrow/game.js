import Joi from 'joi'

export const gameStateValidationSchema = Joi.object().keys({
  gameId: Joi
    .string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/),
  playerId: Joi
    .string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
}).options({
  stripUnknown: true,
  allowUnknown: true
});
