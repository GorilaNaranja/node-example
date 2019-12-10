require("./config/config");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./server/routes/user");
const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(routes);

mongoose.connect("mongodb://localhost:27017/mydatabase", (err, res) => {
  if (err) throw err;
  console.log("Database connected");
});

app.get("/ping", (req, res) => {
  return res.send({
    status: "OK",
    name: "ALL GOOD!",
    uptime: process.uptime()
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Node listening on port ${process.env.PORT}`);
});
