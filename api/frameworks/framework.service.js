const Framework = require("../../models/framework");

const createFramework = async body => {
  const framework = new Framework({
    name: body.name,
    description: body.description,
    language: body.language
  });
  const frameworkDB = await framework.save();
  return frameworkDB;
};

const getFrameworks = async (filters, options) => {
  options.populate = { path: "language", select: "name" };
  return Framework.paginate(filters, options);
};

const getFramework = async id => {
  const framework = await Framework.findById(id);
  return framework;
};

const editFramework = async (id, body) => {
  const framework = await Framework.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  });
  return framework;
};

const deleteFramework = async id => {
  const framework = await Framework.findByIdAndRemove(id);
  return framework;
};

module.exports = {
  createFramework,
  getFrameworks,
  getFramework,
  editFramework,
  deleteFramework
};
