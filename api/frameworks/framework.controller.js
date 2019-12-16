const Framework = require("../../models/framework");
const { handleError } = require("../../utils/handleError");
const _ = require("underscore");

const createFramework = async (req, res) => {
  let body = req.body;
  let framework = new Framework({
    name: body.name,
    description: body.description,
    language: body.language
  });
  try {
    let frameworkDB = await framework.save();
    res.json({ ok: true, framework: frameworkDB });
  } catch (err) {
    handleError(res, 400, err);
  }
};

const getFrameworks = async (req, res) => {
  try {
    const frameworks = await Framework.find({})
      .populate("language", "name")
      .exec();
    const count = await Framework.countDocuments();
    res.json({ ok: true, frameworks, count });
  } catch (error) {
    handleError(res, 400, err);
  }
};

const getFramework = async (req, res) => {
  let id = req.params.id;

  try {
    const framework = await Framework.findById(id);
    if (!framework) {
      handleError(res, 400, (err = { message: "Framework not found" }));
    }
    res.json({ ok: true, framework });
  } catch (error) {
    handleError(res, 400, err);
  }
};

const editFramework = async (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["name", "description", "language"]);

  try {
    const framework = await Framework.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });
    res.json({ ok: true, framework });
  } catch (error) {
    handleError(res, 400, err);
  }
};

const deleteFramework = async (req, res) => {
  let id = req.params.id;

  try {
    const framework = await Framework.findByIdAndRemove(id);
    if (!framework) {
      handleError(res, 400, (err = { message: "Framework not found" }));
    }
    res.json({ ok: true, framework });
  } catch (error) {
    handleError(res, 400, err);
  }
};

module.exports = {
  createFramework,
  getFrameworks,
  getFramework,
  editFramework,
  deleteFramework
};
