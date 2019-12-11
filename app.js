require("./config/config");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./server/routes/user");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

const password = process.env.MONGO_PASS;
const dbName = "test";
const uri = `mongodb+srv://Felipe:${password}@node-example-cluster-vzg5i.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(uri, options, err => {
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
