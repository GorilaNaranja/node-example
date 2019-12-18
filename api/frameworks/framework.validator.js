const Joi = require("@hapi/joi");
const boom = require("@hapi/boom");

const name = Joi.string().max(30);
const description = Joi.string().max(50);
const language = Joi.array();

const createSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  language
});

const editSchema = Joi.object({
  name,
  description,
  language
});

const createFramework = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const editFramework = async (req, res, next) => {
  try {
    await editSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

module.exports = {
  createFramework,
  editFramework
};
