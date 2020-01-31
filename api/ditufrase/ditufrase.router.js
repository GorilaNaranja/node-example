const express = require("express");
const { tokenVerification } = require("../../middlewares/authentication");
const ditufraseController = require("./ditufrase.controller");

const app = express();

app.post("/frase", tokenVerification, ditufraseController.createFrase);

module.exports = app;
