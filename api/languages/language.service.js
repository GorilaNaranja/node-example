const Language = require("../../models/language");

const getLanguages = async () => {
  const languages = await Language.find();
  const count = await Language.countDocuments();
  return { languages, count };
};

const getLanguage = async id => {
  const language = await Language.findById(id);
  return language;
};

const createLanguage = async languageData => {
  const language = new Language({
    name: languageData.name,
    description: languageData.description,
    type: languageData.type
  });
  const languageDB = await language.save();
  return languageDB;
};

const editLanguage = async (id, language) => {
  const languageDB = await Language.findByIdAndUpdate(id, language, {
    new: true,
    runValidators: true
  });
  return languageDB;
};

const deleteLanguage = async id => {
  const language = await Language.findByIdAndRemove(id);
  return language;
};

module.exports = {
  getLanguages,
  getLanguage,
  createLanguage,
  editLanguage,
  deleteLanguage
};
