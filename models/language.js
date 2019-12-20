const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

languagesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Language", languagesSchema);
