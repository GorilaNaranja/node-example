const boom = require("@hapi/boom");
const _ = require("underscore");
const frameworkService = require("./framework.service");

const createFramework = async (req, res) => {
  const body = req.body;
  try {
    const framework = await frameworkService.createFramework(body);
    res.json({ ok: true, framework });
  } catch (error) {
    return next(boom.badData(error.message));
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
    return next(boom.badData(error.message));
  }
};

const getFramework = async (req, res) => {
  try {
    const id = req.params.id;
    const framework = await frameworkService.getFramework(id);
    if (!framework) {
      return next(boom.badData("Framework not found"));
    }
    res.json({ ok: true, framework });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const editFramework = async (req, res) => {
  try {
    const id = req.params.id;
    const body = _.pick(req.body, ["name", "description", "language"]);
    const framework = await frameworkService.editFramework(id, body);
    res.json({ ok: true, framework });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const deleteFramework = async (req, res) => {
  try {
    const id = req.params.id;
    const framework = await frameworkService.deleteFramework(id);
    if (!framework) {
      return next(boom.badData("Framework not found"));
    }
    res.json({ ok: true, framework });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

module.exports = {
  createFramework,
  getFrameworks,
  getFramework,
  editFramework,
  deleteFramework
};
