const bcrypt = require("bcrypt");
const User = require("../../models/user");

const login = async user => {
  const userDB = await User.findOne({ email: user.email });
  return userDB;
};

const createUser = async userData => {
  const user = new User({
    name: userData.name,
    email: userData.email,
    password: bcrypt.hashSync(userData.password, 10),
    role: userData.role,
    language: userData.language
  });
  const userDB = await user.save();
  return userDB;
};

const getUsers = async (filters, options) => {
  options.populate = { path: 'language', select: 'name' };
  return User.paginate(filters, options);
};

const getUser = async id => {
  const user = await User.findById(id)
    .populate("language", "name")
    .exec();
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
