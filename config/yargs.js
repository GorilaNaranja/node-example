const options = {
  name: {
    demand: true,
    alias: "n"
  },
  surname: {
    alias: "s",
    default: "Wilson"
  }
};

const argv = require("yargs")
  .command("show", "Show custom app information", options)
  .command("list", "List custom app information", options)
  .help().argv;

module.exports = { argv };
