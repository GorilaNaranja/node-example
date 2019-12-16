const express = require("express");
const { tokenVerification } = require("../../middlewares/authentication");
const { adminVerification } = require("../../middlewares/authorization");
const userController = require("./user.controller");
const app = express();

app.post("/login", userController.login);

app.get(
  "/user",
  [tokenVerification, adminVerification],
  userController.getUsers
);
app.post(
  "/user",
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

module.exports = app;