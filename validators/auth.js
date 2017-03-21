import Joi from 'joi';

export const authValidationSchema = Joi.object().keys({
  email: Joi
    .string()
    .email()
    .required(),

  password: Joi
    .string()
    .required()
}).options({
  stripUnknown: true,
  allowUnknown: true
});
