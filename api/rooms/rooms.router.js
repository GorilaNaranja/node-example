const express = require("express");
const roomController = require("./room.controller");
const app = express();

app.get("/room/:id", roomController.enterRoom);

module.exports = app;
