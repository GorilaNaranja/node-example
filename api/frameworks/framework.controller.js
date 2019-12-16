const { handleError } = require("../../utils/handleError");
const _ = require("underscore");
const frameworkService = require("./framework.service");

const createFramework = async (req, res) => {
  const body = req.body;
  try {
    const framework = await frameworkService.createFramework(body);
    res.json({ ok: true, framework });
  } catch (error) {
    handleError(res, 400, error);
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
    handleError(res, 400, error);
  }
};

const getFramework = async (req, res) => {
  try {
    const id = req.params.id;
    const framework = await frameworkService.getFramework(id);
    if (!framework) {
      handleError(res, 400, (error = { message: "Framework not found" }));
    }
    res.json({ ok: true, framework });
  } catch (error) {
    handleError(res, 400, error);
  }
};

const editFramework = async (req, res) => {
  try {
    const id = req.params.id;
    const body = _.pick(req.body, ["name", "description", "language"]);
    const framework = await frameworkService.editFramework(id, body);
    res.json({ ok: true, framework });
  } catch (error) {
    handleError(res, 400, error);
  }
};

const deleteFramework = async (req, res) => {
  try {
    const id = req.params.id;
    const framework = await frameworkService.deleteFramework(id);
    if (!framework) {
      handleError(res, 400, (error = { message: "Framework not found" }));
    }
    res.json({ ok: true, framework });
  } catch (error) {
    handleError(res, 400, error);
  }
};

module.exports = {
  createFramework,
  getFrameworks,
  getFramework,
  editFramework,
  deleteFramework
};
