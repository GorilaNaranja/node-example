const boom = require("@hapi/boom");
const _ = require("underscore");
const frameworkService = require("./framework.service");
const queryOptions = require("../../utils/queryOptions");
const frameworkFilters = require("./framework.filters");

const createFramework = async (req, res, next) => {
  try {
    const body = req.body;
    const framework = await frameworkService.createFramework(body);
    res.json({ ok: true, framework });
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      return next(boom.badData("Framework name already exists"));
    }
    return next(boom.badData(error.message));
  }
};

const getFrameworks = async (req, res, next) => {
  try {
    const filters = frameworkFilters(req.query);
    const options = queryOptions(req.query);
    const frameworks = await frameworkService.getFrameworks(filters, options);
    res.json({ ok: true, frameworks });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const getFramework = async (req, res, next) => {
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

const editFramework = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = _.pick(req.body, ["name", "description", "language"]);
    const framework = await frameworkService.editFramework(id, body);
    if (!framework) {
      return next(boom.badData("Framework not found"));
    }
    res.json({ ok: true, framework });
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

const deleteFramework = async (req, res, next) => {
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
