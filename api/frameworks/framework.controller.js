const Framework = require("../../models/framework");
const { handleError } = require("../../utils/handleError");
const _ = require("underscore");
const frameworkService = require("./framework.service");

const createFramework = async (req, res) => {
  let body = req.body;
  try {
    const framework = await frameworkService.createFramework(body);
    res.json({ ok: true, framework });
  } catch (err) {
    handleError(res, 400, err);
  }
};

const getFrameworks = async (req, res) => {
  try {
    const frameworks = await frameworkService.getFrameworks();
    res.json({
      ok: true,
      frameworks: frameworks.frameworks,
      count: frameworks.count
    });
  } catch (error) {
    handleError(res, 400, err);
  }
};

const getFramework = async (req, res) => {
  try {
    let id = req.params.id;
    const framework = await frameworkService.getFramework(id);
    if (!framework) {
      handleError(res, 400, (err = { message: "Framework not found" }));
    }
    res.json({ ok: true, framework });
  } catch (error) {
    handleError(res, 400, err);
  }
};

const editFramework = async (req, res) => {
  try {
    let id = req.params.id;
    let body = _.pick(req.body, ["name", "description", "language"]);
    const framework = await frameworkService.editFramework(id, body);
    res.json({ ok: true, framework });
  } catch (error) {
    handleError(res, 400, err);
  }
};

const deleteFramework = async (req, res) => {
  try {
    let id = req.params.id;
    const framework = await frameworkService.deleteFramework(id);
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
