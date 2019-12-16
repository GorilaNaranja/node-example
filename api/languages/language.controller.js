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
  } catch (error) {
    handleError(res, 400, error);
  }
};

const getLanguage = async (req, res) => {
  try {
    const id = req.params.id;
    const language = await languageService.getLanguage(id);

    if (!language) {
      return handleError(res, 400, (error = { message: "Language not found" }));
    }

    res.json({ ok: true, language });
  } catch (error) {
    handleError(res, 400, error);
  }
};

const createLanguage = async (req, res) => {
  try {
    const body = req.body;
    const language = await languageService.createLanguage(body);
    res.json({ ok: true, language });
  } catch (error) {
    handleError(res, 400, error);
  }
};

const editLanguage = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const language = await languageService.editLanguage(id, body);
    res.json({ ok: true, language });
  } catch (error) {
    handleError(res, 400, error);
  }
};

const deleteLanguage = async (req, res) => {
  try {
    const id = req.params.id;
    const language = await languageService.deleteLanguage(id);

    if (!language) {
      return handleError(res, 400, (error = { message: "Language not found" }));
    }

    res.json({ ok: true, language });
  } catch (error) {
    handleError(res, 400, error);
  }
};

module.exports = {
  getLanguages,
  getLanguage,
  createLanguage,
  editLanguage,
  deleteLanguage
};
