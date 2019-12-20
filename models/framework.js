const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

frameworkSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Framework", frameworkSchema);
