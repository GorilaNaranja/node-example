const Message = require("../../models/message");

const createMessage = async data => {
  const message = new Message({
    user: data.user,
    message: data.message,
    room: data.room,
    date: data.date
  });
  const messageDB = await message.save();
  return messageDB;
};

const getMessagesByRoom = async room => {
  const messages = await Message.find({ room: room });
  return messages;
};

module.exports = { createMessage, getMessagesByRoom };
