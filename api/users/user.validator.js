const Joi = require("@hapi/joi");
const boom = require("@hapi/boom");

const name = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required();

const password = Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"));

const email = Joi.string()
  .email()
  .required();

const role = Joi.string()
  .valid("USER_ROLE", "ADMIN_ROLE")
  .required();

const createSchema = Joi.object({ name, password, email, role });
const loginSchema = Joi.object({ password, email });

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

module.exports = {
  loginUser,
  createUser
};
