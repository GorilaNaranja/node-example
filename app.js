require("./config/config");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const boom = require("@hapi/boom");
const routes = require("./api/routes");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

const password = process.env.MONGO_PASS;
const dbName = "test";
const uri = `mongodb+srv://Felipe:${password}@node-example-cluster-vzg5i.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

const connect = async () => {
  try {
    console.log("Trying to connect database...");
    await mongoose.connect(uri, options);
    console.log("Database connected");
  } catch (e) {
    console.log("Connection error, retrying in 5 sec...");
    setTimeout(connect, 5000);
  }
};

connect();

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

app.use((err, req, res, next) => {
  if (!err.isBoom) {
    if (err.message === "validation error") {
      return res.status(err.status).json({
        statusCode: err.status,
        error: "Unprocessable Entity",
        message: err.statusText
      });
    }
    err = boom.badImplementation();
  }
  return res.status(err.output.statusCode).json(err.output.payload);
});