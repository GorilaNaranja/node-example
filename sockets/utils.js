function createMessage(user, message, room) {
  console.log("UTIL", user);
  return {
    user: user.name,
    message,
    room,
    date: new Date().getTime()
  };
}

module.exports = { createMessage };
