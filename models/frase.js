const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fraseSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"]
  },
  frase: {
    type: String,
    required: [true, "Frase is required"]
  }
});

module.exports = mongoose.model("Frase", fraseSchema);
