const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let frameworkSchema = new Schema({
  name: {
    type: String,
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
