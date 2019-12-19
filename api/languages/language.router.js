const express = require("express");
const { tokenVerification } = require("../../middlewares/authentication");
const { adminVerification } = require("../../middlewares/authorization");
const languageController = require("./language.controller");
const validator = require("./language.validator");

const app = express();

app.post(
  "/language",
  validator.createLanguage,
  [tokenVerification, adminVerification],
  languageController.createLanguage
);
app.get("/language", tokenVerification, languageController.getLanguages);
app.get("/language/:id", tokenVerification, languageController.getLanguage);
app.put(
  "/language/:id",
  validator.editLanguage,
  [tokenVerification, adminVerification],
  languageController.editLanguage
);
app.delete(
  "/language/:id",
  [tokenVerification, adminVerification],
  languageController.deleteLanguage
);

app.get(
  "/languages/pdf",
  [tokenVerification, adminVerification],
  languageController.downloadPdfLanguages
);

module.exports = app;
