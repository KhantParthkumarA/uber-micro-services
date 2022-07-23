import Joi from "joi";

export default {
  //a middleware that validates the request body input from the user

  //here is a sample
  signup: {
    body: {
      schema: Joi.object({
        email: Joi.string().email().trim().lowercase().required(),
        phoneNumber: Joi.string().trim().required(),
        password: Joi.string().required(),
        username: Joi.string().lowercase().min(3).trim(),
        firstname: Joi.string().max(50).trim().optional(),
        lastname: Joi.string().max(50).trim().optional(),
        userType: Joi.string()
          .valid("DELIVERY-RIDERS", "DOCTORS", "CUSTOMERS", "MERCHANTS")
          .trim(),
        token: Joi.string(),
      }),
    },
  },
};
