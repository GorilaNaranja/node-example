const bcrypt = require("bcrypt");
const User = require("../../models/user");

const login = async user => {
  const userDB = await User.findOne({ email: user.email });
  return userDB;
};

const createUser = async userData => {
  let user = new User({
    name: userData.name,
    email: userData.email,
    password: bcrypt.hashSync(userData.password, 10),
    role: userData.role,
    language: userData.language
  });
  let userDB = await user.save();
  return userDB;
};

const getUsers = async () => {
  const users = await User.find({})
    .populate("language", "name")
    .exec();
  const count = await User.countDocuments();
  return { users, count };
};

const getUser = async id => {
  const user = await User.findById(id);
  return user;
};

const editUser = async (id, userData) => {
  const user = await User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true
  });
  return user;
};

const deleteUser = async id => {
  const user = await User.findByIdAndRemove(id);
  return user;
};

module.exports = { login, createUser, getUsers, getUser, editUser, deleteUser };
