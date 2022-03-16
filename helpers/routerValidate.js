const Joi = require("joi");

const validateParams = (schema) => {
  return (req, res, next) => {
    const validateResult = schema.validate(req.body);
    console.log(validateResult);

    if (validateResult.error) {
      return res.status(400).json({ message: validateResult.error.details });
    }
    next();
  };
};

const schemas = {
  userSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    fullName: Joi.string().required(),
    photoURL: Joi.string(),
    providerId: Joi.string(),
    tag: Joi.string(),
    uid: Joi.string().required(),
  }),

  postSchema: Joi.object().keys({
    images: Joi.array().items(Joi.string()),
    text: Joi.string(),
    userRef: Joi.string().required(),
  }),
};

module.exports = {
  validateParams,
  schemas,
};
