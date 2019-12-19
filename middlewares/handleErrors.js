const boom = require("@hapi/boom");

const handleErrors = (err, req, res, next) => {
  if (!err.isBoom) {
    if (err.message === "validation error") {
      const errors = [];
      err.errors.forEach(error => {
        const field = _.get(error, "field[0]", undefined);
        const errorMessage = _.get(error, "types[0]", undefined);
        if (field && errorMessage) {
          errors.push({
            [field]: `api.error.validation.${errorMessage.replace(".", "_")}`
          });
        }
      });
      return res.status(err.status).json({
        statusCode: err.status,
        message: err.statusText,
        errors
      });
    }
    err = boom.badImplementation();
  }
  return res.status(err.output.statusCode).json(err.output.payload);
};

module.exports = { handleErrors };
