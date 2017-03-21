import Joi from 'joi'

export const idValidationSchema = Joi.object().keys({
    id: Joi
        .string()
        .required()
        .regex(/^[0-9a-fA-F]{24}$/)
}).options({
  stripUnknown: true,
  allowUnknown: true
});

export const nameValidationSchema = Joi.object().keys({
    name: Joi
        .string()
}).options({
  stripUnknown: true,
  allowUnknown: true
});
