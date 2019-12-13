const Language = require("../models/language");
const { handleError } = require("../../utils/handleError");

const getLanguages = (req, res) => {
  Language.find((err, language) => {
    if (err) return handleError(res, 400, err);

    Language.countDocuments((err, count) => {
      res.json({
        ok: true,
        language,
        count
      });
    });
  });
};

const getLanguage = (req, res) => {
  let id = req.params.id;

  Language.findById(id, (err, languageDB) => {
    if (err) return handleError(res, 400, err);

    if (!languageDB) {
      return handleError(res, 400, (err = { message: "Language not found" }));
    }
    
    res.json({
      ok: true,
      language: languageDB
    });
  });
};

const createLanguage = (req, res) => {
  let body = req.body;

  let language = new Language({
    name: body.name,
    description: body.description,
    type: body.type
  });

  language.save((err, languageDB) => {
    if (err) return handleError(res, 400, err);

    res.json({
      ok: true,
      language: languageDB
    });
  });
};

const editLanguage = (req, res) => {
  let id = req.params.id;
  let body = req.body;

  Language.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, languageDB) => {
      if (err) return handleError(res, 400, err);

      res.json({
        ok: true,
        language: languageDB
      });
    }
  );
};

const deleteLanguage = (req, res) => {
  let id = req.params.id;

  Language.findByIdAndRemove(id, (err, languageRemoved) => {
    if (err) return handleError(res, 400, err);

    if (!languageRemoved) {
      return handleError(res, 400, (err = { message: "Language not found" }));
    }

    res.json({
      ok: true,
      language: languageRemoved
    });
  });
};

module.exports = {
  getLanguages,
  getLanguage,
  createLanguage,
  editLanguage,
  deleteLanguage
};
