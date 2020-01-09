const boom = require("@hapi/boom");
const path = require("path");

const enterRoom = async (req, res, next) => {
  try {
    res.sendFile(path.resolve("public/room.html"));
  } catch (error) {
    return next(boom.badData(error.message));
  }
};

module.exports = { enterRoom };
