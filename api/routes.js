const express = require("express");
const app = express();

app.use(require("./users/user.router"));
app.use(require("./languages/language.router"));
app.use(require("./frameworks/framework.router"));

module.exports = app;
