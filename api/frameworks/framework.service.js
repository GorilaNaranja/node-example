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

const getFrameworks = async () => {
  const frameworks = await Framework.find({})
    .populate("language", "name")
    .exec();
  const count = await Framework.countDocuments();
  return { frameworks, count };
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
