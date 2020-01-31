const boom = require("@hapi/boom");
const ditufraseService = require("./ditufrase.service");

const createFrase = async (req, res, next) => {
  try {
    const body = req.body;
    const frase = await ditufraseService.createFrase(body);
    res.json({ ok: true, frase });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

module.exports = {
  createFrase
};
