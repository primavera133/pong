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
  game: {
    gameId: Joi
      .string()
      .required(),
    name: Joi
      .string()
      .required()
  },
  playerOne: {
    playerId: Joi
      .string()
      .required(),
    name: Joi
      .string()
      .required(),
  },
  playerTwo: {
    playerId: Joi
      .string()
      .required(),
    name: Joi
      .string()
      .required(),
  },
  turn: Joi
    .string(),
  accepted: Joi
    .boolean(),
  rejected: Joi
    .boolean()
}).options({
  stripUnknown: true,
  allowUnknown: true
});
