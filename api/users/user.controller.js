const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const boom = require("@hapi/boom");
const _ = require("underscore");
const userService = require("./user.service");
const nodemailer = require("nodemailer");
const queryOptions = require("../../utils/queryOptions");
const userFilters = require("./user.filters");

const login = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await userService.login(body);

    if (!user || !bcrypt.compareSync(body.password, user.password)) {
      return next(boom.unauthorized("User or password wrong"));
    }

    const token = jwt.sign({ user: user }, process.env.TOKEN_SEED, {
      expiresIn: process.env.TOKEN_TTL
    });

    res.json({ ok: true, user: user, token });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const createUser = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await userService.createUser(body);
    res.json({ ok: true, user });
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      return next(boom.badData("Email already exists"));
    }
    return next(boom.badData(error.message));
  }
};

const getUsers = async (req, res, next) => {
  try {
    const filters = userFilters(req.query);
    const options = queryOptions(req.query);
    const users = await userService.getUsers(filters, options);
    res.json({ ok: true, users });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await userService.getUser(id);
    if (!user) {
      return next(boom.badData("User not found"));
    }
    res.json({ ok: true, user });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const editUser = async (req, res, next) => {
  const id = req.params.id;
  const body = _.pick(req.body, ["name", "email", "role", "language"]);

  try {
    const user = await userService.editUser(id, body);
    if (!user) {
      return next(boom.badData("User not found"));
    }
    res.json({ ok: true, user });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await userService.deleteUser(id);
    if (!user) {
      return next(boom.badData("User not found"));
    }
    res.json({ ok: true, user });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const sendEmailToUser = async (req, res, next) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: { user: testAccount.user, pass: testAccount.pass }
  });

  try {
    const info = await transporter.sendMail({
      from: `"${req.user.name}" <${req.user.email}>`,
      to: req.body.email,
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>"
    });

    res.json({ ok: true, preview: nodemailer.getTestMessageUrl(info) });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

module.exports = {
  login,
  createUser,
  getUsers,
  getUser,
  editUser,
  deleteUser,
  sendEmailToUser
};
