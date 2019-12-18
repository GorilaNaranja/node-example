const express = require("express");
const { tokenVerification } = require("../../middlewares/authentication");
const { adminVerification } = require("../../middlewares/authorization");
const frameworkController = require("./framework.controller");
const validator = require("./framework.validator");
const app = express();

app.get("/framework", tokenVerification, frameworkController.getFrameworks);
app.post(
  "/framework",
  validator.createFramework,
  [tokenVerification, adminVerification],
  frameworkController.createFramework
);
app.get("/framework/:id", tokenVerification, frameworkController.getFramework);
app.put(
  "/framework/:id",
  validator.editFramework,
  [tokenVerification, adminVerification],
  frameworkController.editFramework
);
app.delete(
  "/framework/:id",
  [tokenVerification, adminVerification],
  frameworkController.deleteFramework
);

module.exports = app;
