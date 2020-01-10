const express = require("express");
const roomController = require("./room.controller");
const app = express();
const { tokenVerification } = require("../../middlewares/authentication");

app.get("/room/:id", roomController.enterRoom);

module.exports = app;
