require("dotenv").config({ path: "./.env" });

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./api/routes");
const { handleErrors } = require("./middlewares/handleErrors");
const helmet = require("helmet");

const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io").listen(http);

app.use(cors());
app.options("*", cors()); // add this before your routes

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);
app.use(helmet());
app.set("view engine", "ejs");

const password = process.env.MONGO_PASS;
const dbName = "test";
const uri = `mongodb+srv://admin:${password}@cluster0.swnd8.mongodb.net/${dbName}?retryWrites=true&w=majority`;
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

http.listen(process.env.PORT, () => {
  console.log(`Node listening on port ${process.env.PORT}`);
});

// SOCKETS.IO
module.exports = { io };
require("./sockets/socket");

app.use((err, req, res, next) => {
  handleErrors(err, req, res, next);
});
