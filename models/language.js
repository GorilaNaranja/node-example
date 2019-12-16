const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const languagesSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name is required"]
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  type: {
    type: String,
    required: [true, "Type is required"]
  }
});

module.exports = mongoose.model("Language", languagesSchema);
