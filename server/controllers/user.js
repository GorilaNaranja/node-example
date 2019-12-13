const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { handleError } = require("../../utils/handleError");
const _ = require("underscore");

const login = async (req, res) => {
  let body = req.body;
  try {
    const userDb = await User.findOne({ email: body.email });

    // TODO: esto va aquí o en el servicio?
    if (!userDb || !bcrypt.compareSync(body.password, userDb.password)) {
      handleError(res, 400, (err = { message: "User or password wrong" }));
    }

    let token = jwt.sign({ user: userDb }, process.env.TOKEN_SEED, {
      expiresIn: process.env.TOKEN_TTL
    });

    res.json({ ok: true, user: userDb, token });
  } catch (error) {
    handleError(res, 500, error);
  }
};

const createUser = async (req, res) => {
  let body = req.body;

  // TODO: mirar estructura del boilerplate, más cómodo todo en una carpeta user = controllers, routes, services, etc
  // TODO: Todo esto al servicio y ponemos un await al servicio
  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
    language: body.language
  });
  try {
    let userDB = await user.save();
    res.json({ ok: true, user: userDB });
  } catch (err) {
    handleError(res, 400, err);
  }
  ////////////
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .populate("language", "name")
      .exec();
    const count = await User.countDocuments();
    res.json({ ok: true, users, count });
  } catch (error) {
    handleError(res, 400, err);
  }
};

const getUser = async (req, res) => {
  let id = req.params.id;

  try {
    const user = await User.findById(id);
    if (!user) {
      handleError(res, 400, (err = { message: "User not found" }));
    }
    res.json({ ok: true, user });
  } catch (error) {
    handleError(res, 400, err);
  }
};

const editUser = async (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["name", "email", "role", "language"]);

  try {
    const user = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });
    res.json({ ok: true, user });
  } catch (error) {
    handleError(res, 400, err);
  }
};

const deleteUser = async (req, res) => {
  let id = req.params.id;

  try {
    const user = await User.findByIdAndRemove(id);
    if (!user) {
      handleError(res, 400, (err = { message: "User not found" }));
    }
    res.json({ ok: true, user });
  } catch (error) {
    handleError(res, 400, err);
  }
};

module.exports = {
  login,
  createUser,
  getUsers,
  getUser,
  editUser,
  deleteUser
};
