const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const { handleError } = require("../../utils/handleError");
const _ = require("underscore");

const login = (req, res) => {
  let body = req.body;

  User.findOne({ email: body.email }, (err, userDb) => {
    if (err) return handleError(res, 500, err);

    if (!userDb || !bcrypt.compareSync(body.password, userDb.password)) {
      return handleError(
        res,
        400,
        (err = { message: "User or password wrong" })
      );
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
};

const createUser = async (req, res) => {
  let body = req.body;

  // Todo esto al servicio y ponemos un await al servicio

  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
    language: body.language
  });

  // Cambiar todos los callbacks por awaits
  try {
    let userDB = await user.save();
    res.json({
      ok: true,
      user: userDB
    });
  } catch (err) {
    handleError(res, 400, err);
  }
};

const getUsers = (req, res) => {
  User.find({})
    .populate("language", "name")
    .exec((err, users) => {
      if (err) return handleError(res, 400, err);

      User.countDocuments((err, count) => {
        res.json({
          ok: true,
          users,
          count
        });
      });
    });
};

const getUser = (req, res) => {
  let id = req.params.id;

  User.findById(id, (err, userDB) => {
    if (err) return handleError(res, 400, err);

    if (!userDB) {
      return handleError(res, 400, (err = { message: "User not found" }));
    }

    res.json({
      ok: true,
      user: userDB
    });
  });
};

const editUser = (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["name", "email", "role", "language"]);

  User.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, userDB) => {
      if (err) return handleError(res, 400, err);

      res.json({
        ok: true,
        user: userDB
      });
    }
  );
};

const deleteUser = (req, res) => {
  let id = req.params.id;

  User.findByIdAndRemove(id, (err, userRemoved) => {
    if (err) return handleError(res, 400, err);

    if (!userRemoved) {
      return handleError(res, 400, (err = { message: "User not found" }));
    }

    res.json({
      ok: true,
      user: userRemoved
    });
  });
};

module.exports = {
  login,
  createUser,
  getUsers,
  getUser,
  editUser,
  deleteUser
};
