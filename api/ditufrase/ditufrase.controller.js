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

const getFrase = async (req, res, next) => {
  try {
    if (req.query.username) {
      const username = req.query.username.toLowerCase();
      const data = await ditufraseService.getFrase(username);
      if (!data || !data.frase) {
        res.json(`Todavía no tienes tu frase`);
      }
      res.json(`Di tu frase ${username}: ${data.frase}`);
    } else {
      res.json(`Define un username en la query`);
    }
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

module.exports = {
  getFrase,
  createFrase
};
