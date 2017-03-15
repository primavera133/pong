import Joi from 'joi'

export const loginValidationSchema = Joi.object().keys({
  email: Joi
    .string()
    .required(),
  password: Joi
    .string()
    .required()
}).options({
  stripUnknown: true,
  allowUnknown: true
});
