const Joi = require("@hapi/joi");
const boom = require("@hapi/boom");

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  description: Joi.string()
    .min(3)
    .max(50)
    .required(),
  type: Joi.string()
    .min(3)
    .max(30)
    .required()
});

const createLanguage = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

module.exports = {
  createLanguage
};
