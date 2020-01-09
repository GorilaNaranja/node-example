function createMessage(user, message, room) {
  return {
    user: user.name,
    message,
    room,
    date: new Date().getTime()
  };
}

module.exports = { createMessage };
