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
    const person = await starWarsService.getPeopleById(req.params.id);

    const worldId = parseInt(
      person.homeworld.split("planets/")[1].split("/")[0]
    );
    const world = await starWarsService.getPlanetsById(worldId);

    const promises = world.residents.map(async resident => {
      const personId = parseInt(resident.split("people/")[1].split("/")[0]);
      const personInThePlanet = await starWarsService.getPeopleById(personId);
      return personInThePlanet.name;
    });

    let neighbors = [];

    await Promise.all(promises)
      .then(res => {
        neighbors = res;
      })
      .catch(err => {
        console.log("err", err);
      });

    const result = {
      person: person.name,
      world: world.name,
      neighbors
    };
    res.json(result);
  } catch (error) {
    return "error";
  }
};

const schema = async (req, res, next) => {
  try {
    res.json(await starWarsService.peopleSchema());
  } catch (error) {
    return "error";
  }
};

module.exports = {
  listPeople,
  getPeople,
  schema
};
