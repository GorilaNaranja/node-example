const boom = require("@hapi/boom");
const languageService = require("./language.service");
const fs = require("fs");
const queryOptions = require("../../utils/queryOptions");
const languageFilters = require("./language.filters");

const getLanguages = async (req, res, next) => {
  try {
    const filters = languageFilters(req.query);
    const options = queryOptions(req.query);
    const languages = await languageService.getLanguages(filters, options);
    res.json({ ok: true, languages });
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

const downloadPdfLanguages = async (req, res, next) => {
  try {
    const filePath = await languageService.generatePdfLanguages();
    var data = fs.readFileSync(filePath);
    res.contentType("application/pdf");
    res.send(data);
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

module.exports = {
  getLanguages,
  getLanguage,
  createLanguage,
  editLanguage,
  deleteLanguage,
  downloadPdfLanguages
};
