const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const frameworkSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name is required"]
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  language: [
    {
      type: Schema.Types.ObjectId,
      ref: "Language",
      default: []
    }
  ]
});

module.exports = mongoose.model("Framework", frameworkSchema);
