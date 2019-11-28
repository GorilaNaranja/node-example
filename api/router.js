const peopleController = require("./people/people.controller");

module.exports = app => {
  app.use(`/people`, require("./people/people.router.js"));
};
