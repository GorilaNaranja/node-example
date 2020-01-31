const Frase = require("../../models/frase");

const createFrase = async data => {
  const frase = new Frase({
    frase: data.frase,
    username: data.userName.toLowerCase()
  });
  const fraseDB = await frase.save();
  return fraseDB;
};

const getFrase = async name => {
  const frase = await Frase.findOne({ username: name });
  if (!frase) return { frase: `Todavía no tengo frase` };
  return frase;
};

module.exports = { createFrase, getFrase };
