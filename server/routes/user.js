const express = require("express");

const bcrypt = require("bcrypt");
const _ = require("underscore");

const User = require("../models/user");

const app = express();

app.get("/user", function(req, res) {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    User.countDocuments((err, count) => {
      res.json({
        ok: true,
        users,
        count
      });
    });
  });
});

app.post("/user", function(req, res) {
  let body = req.body;

  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      user: userDB
    });
  });
});

app.put("/user/:id", function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ["name", "email", "role"]);

  User.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        user: usuarioDB
      });
    }
  );
});

app.delete("/user/:id", function(req, res) {
  let id = req.params.id;

  User.findByIdAndRemove(id, (err, usuarioBorrado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    if (!usuarioBorrado) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "User not found"
        }
      });
    }

    res.json({
      ok: true,
      user: usuarioBorrado
    });
  });
});

module.exports = app;
