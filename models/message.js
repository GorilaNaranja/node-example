const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user: {
    type: String,
    required: [true, "User is required"]
  },
  message: {
    type: String,
    required: [true, "Message is required"]
  },
  room: {
    type: String,
    required: [true, "Room is required"]
  },
  date: {
    type: Date,
    required: [true, "Date is required"]
  }
});

module.exports = mongoose.model("Message", messageSchema);
