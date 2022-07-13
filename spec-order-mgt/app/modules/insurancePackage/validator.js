import Joi from "joi";

export default{
    create: {
        body: {
          schema: Joi.object({
            name: Joi.string()
              .max(50)
              .trim(),

            insuranceType: Joi.string()
              .max(50)
              .required(),

            description: Joi.string()
              .lowercase()
              .min(250),

            insuranceValue: Joi.string()
              .required(),
          }),
        },
      },
}