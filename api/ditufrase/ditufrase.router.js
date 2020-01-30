const express = require("express");
const { tokenVerification } = require("../../middlewares/authentication");
const ditufraseController = require("./ditufrase.controller");

const app = express();

app.post("/frase", tokenVerification, ditufraseController.createFrase);
app.get("/frase", ditufraseController.getFrase);

module.exports = app;
