const bcrypt = require("bcrypt");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const { handleError } = require("../../utils/handleError");
const _ = require("underscore");
const userService = require("./user.service");

const login = async (req, res) => {
  try {
    let body = req.body;
    const user = await userService.login(body);

    if (!user || !bcrypt.compareSync(body.password, user.password)) {
      handleError(res, 400, (err = { message: "User or password wrong" }));
    }

    let token = jwt.sign({ user: user }, process.env.TOKEN_SEED, {
      expiresIn: process.env.TOKEN_TTL
    });

    res.json({ ok: true, user: user, token });
  } catch (error) {
    handleError(res, 500, error);
  }
};

const createUser = async (req, res) => {
  try {
    let body = req.body;
    const user = await userService.createUser(body);
    res.json({ ok: true, user });
  } catch (err) {
    handleError(res, 400, err);
  }
};

const getUsers = async (req, res) => {
  try {
    const usersData = await userService.getUsers();
    res.json({ ok: true, users: usersData.users, count: usersData.count });
  } catch (error) {
    handleError(res, 400, err);
  }
};

const getUser = async (req, res) => {
  try {
    let id = req.params.id;
    const user = await userService.getUser(id);
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
    const user = await userService.editUser(id, body);
    res.json({ ok: true, user });
  } catch (error) {
    handleError(res, 400, err);
  }
};

const deleteUser = async (req, res) => {
  let id = req.params.id;

  try {
    const user = await userService.deleteUser(id);
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
