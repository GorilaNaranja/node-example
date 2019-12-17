const Joi = require("@hapi/joi");
const boom = require("@hapi/boom");

const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  email: Joi.string()
    .email()
    .required(),
  role: Joi.string().required()
});

const createUser = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

// const loginUser = async (req, res, next) => {
//   try {
//     /**
//      * AQUÍ QUIERO VALIDAR EL SCHEMA SOLO CON EMAIL Y PASSWORD
//      */
//     await schema.validateAsync(req.body);
//     next();
//   } catch (error) {
//     return next(boom.badData(error.message));
//   }
// };

module.exports = {
  createUser
  //   loginUser
};
