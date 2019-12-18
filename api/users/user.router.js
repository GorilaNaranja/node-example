const express = require("express");
const { tokenVerification } = require("../../middlewares/authentication");
const { adminVerification } = require("../../middlewares/authorization");
const validator = require("./user.validator");
const userController = require("./user.controller");
const app = express();

app.post("/login", validator.loginUser, userController.login);

app.get(
  "/user",
  [tokenVerification, adminVerification],
  userController.getUsers
);
app.post(
  "/user",
  validator.createUser,
  [tokenVerification, adminVerification],
  userController.createUser
);
app.get(
  "/user/:id",
  [tokenVerification, adminVerification],
  userController.getUser
);
app.put(
  "/user/:id",
  [tokenVerification, adminVerification],
  userController.editUser
);
app.delete(
  "/user/:id",
  [tokenVerification, adminVerification],
  userController.deleteUser
);
app.post(
  "/user/send",
  [tokenVerification, adminVerification],
  userController.sendEmailToUser
);

module.exports = app;
