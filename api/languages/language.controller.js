const { handleError } = require("../../utils/handleError");
const languageService = require("./language.service");

const getLanguages = async (req, res) => {
  try {
    const languages = await languageService.getLanguages();
    res.json({
      ok: true,
      languages: languages.languages,
      count: languages.count
    });
  } catch (err) {
    handleError(res, 400, err);
  }
};

const getLanguage = async (req, res) => {
  try {
    let id = req.params.id;
    const language = await languageService.getLanguage(id);

    if (!language) {
      return handleError(res, 400, (err = { message: "Language not found" }));
    }

    res.json({ ok: true, language });
  } catch (err) {
    handleError(res, 400, err);
  }
};

const createLanguage = async (req, res) => {
  try {
    let body = req.body;
    const language = await languageService.createLanguage(body);
    res.json({ ok: true, language });
  } catch (err) {
    handleError(res, 400, err);
  }
};

const editLanguage = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    const language = await languageService.editLanguage(id, body);
    res.json({ ok: true, language });
  } catch (err) {
    handleError(res, 400, err);
  }
};

const deleteLanguage = async (req, res) => {
  try {
    let id = req.params.id;
    const language = await languageService.deleteLanguage(id);

    if (!language) {
      return handleError(res, 400, (err = { message: "Language not found" }));
    }

    res.json({ ok: true, language });
  } catch (err) {
    handleError(res, 400, err);
  }
};

module.exports = {
  getLanguages,
  getLanguage,
  createLanguage,
  editLanguage,
  deleteLanguage
};
