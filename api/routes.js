const express = require("express");
const app = express();

app.use(require("./users/user.router"));
app.use(require("./languages/language.router"));
app.use(require("./frameworks/framework.router"));
app.use(require("./geolocation/geolocation.router"));
app.use(require("./rooms/rooms.router"));
app.use(require("./ditufrase/ditufrase.router"));

module.exports = app;
