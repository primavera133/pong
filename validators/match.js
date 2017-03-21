import Joi from 'joi'

export const matchStartValidationSchema = Joi.object().keys({
  opponent: {
    _id: Joi
      .string()
      .required(),
    name: Joi
      .string()
      .required(),
  },
  game: {
    _id: Joi
      .string()
      .required(),
    name: Joi
      .string()
      .required()
  }
}).options({
  stripUnknown: true,
  allowUnknown: true
});

export const matchValidationSchema = Joi.object().keys({
  game: Joi
    .string()
    .required(),
  playerOne: Joi
    .string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/),
  playerTwo: Joi
    .string()
    .optional()
    .regex(/^[0-9a-fA-F]{24}$/),
}).options({
  stripUnknown: true,
  allowUnknown: true
});
