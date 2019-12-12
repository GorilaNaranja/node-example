const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const app = express();

app.post("/login", function(req, res) {
  let body = req.body;

  User.findOne({ email: body.email }, (err, userDb) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }
    if (!userDb || !bcrypt.compareSync(body.password, userDb.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "User or password wrong"
        }
      });
    }
    let token = jwt.sign({ user: userDb }, process.env.TOKEN_SEED, {
      expiresIn: process.env.TOKEN_TTL
    });
    res.json({
      ok: true,
      user: userDb,
      token
    });
  });
});

module.exports = app;
