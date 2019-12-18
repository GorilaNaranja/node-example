const Joi = require("@hapi/joi");
const boom = require("@hapi/boom");

const name = Joi.string().max(30);
const description = Joi.string().max(50);
const type = Joi.string().max(30);

const createSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  type: type.required()
});

const editSchema = Joi.object({
  name,
  description,
  type
});

const createLanguage = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const editLanguage = async (req, res, next) => {
  try {
    await editSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

module.exports = {
  createLanguage,
  editLanguage
};
