const boom = require("@hapi/boom");
const languageService = require("./language.service");

const getLanguages = async (req, res, next) => {
  try {
    const languages = await languageService.getLanguages();
    res.json({
      ok: true,
      languages: languages.languages,
      count: languages.count
    });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const getLanguage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const language = await languageService.getLanguage(id);

    if (!language) {
      return next(boom.badData("Language not found"));
    }

    res.json({ ok: true, language });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const createLanguage = async (req, res, next) => {
  try {
    const body = req.body;
    const language = await languageService.createLanguage(body);
    res.json({ ok: true, language });
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      return next(boom.badData("Language name already exists"));
    }
    return next(boom.badData(error.message));
  }
};

const editLanguage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const language = await languageService.editLanguage(id, body);
    if (!language) {
      return next(boom.badData("Language not found"));
    }
    res.json({ ok: true, language });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const deleteLanguage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const language = await languageService.deleteLanguage(id);
    if (!language) {
      return next(boom.badData("Language not found"));
    }
    res.json({ ok: true, language });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

module.exports = {
  getLanguages,
  getLanguage,
  createLanguage,
  editLanguage,
  deleteLanguage
};
