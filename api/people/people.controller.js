starWarsService = require("../../services/starwars.service");

const listPeople = async (req, res, next) => {
  try {
    res.json(await starWarsService.getPeople());
  } catch (error) {
    return "error";
  }
};

const getPeople = async (req, res, next) => {
  try {
    res.json(await starWarsService.getPeopleById(req.params.id));
  } catch (error) {
    return "error";
  }
};

module.exports = {
  listPeople,
  getPeople
};
