const express = require("express");
const app = express();
const userController = require("../controllers/user");

app.post("/login", userController.login);

module.exports = app;
