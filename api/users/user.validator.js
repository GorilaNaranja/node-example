const Joi = require("@hapi/joi");
const boom = require("@hapi/boom");

const name = Joi.string()
  .alphanum()
  .min(3)
  .max(30);
const password = Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"));
const email = Joi.string().email();
const role = Joi.string().valid("USER_ROLE", "ADMIN_ROLE");
const language = Joi.array();

const createSchema = Joi.object({
  name: name.required(),
  password: password.required(),
  email: email.required(),
  role: role.required(),
  language
});

const loginSchema = Joi.object({
  password: password.required(),
  email: email.required()
});

const editSchema = Joi.object({ name, email, language });

const loginUser = async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const createUser = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const editUser = async (req, res, next) => {
  try {
    await editSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

module.exports = {
  loginUser,
  createUser,
  editUser
};
