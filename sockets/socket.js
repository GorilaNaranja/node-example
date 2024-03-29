const { io } = require("../app");
const { Users } = require("./classes/users");
const { createMessage } = require("./utils");
const users = new Users();
const messages = [];
const fraseService = require("../api/ditufrase/ditufrase.service");
const messageService = require("../api/messages/message.service");
const jwt = require("jsonwebtoken");
const kaneyService = require("../utils/kaney");

const socketAuthentications = async token => {
  await jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {
    if (err) return false;
    return true;
  });
};

io.use((socket, next) => {
  const header = socket.handshake.headers["authorization"];
  if (socketAuthentications(header)) {
    return next();
  }
  return next(new Error("authentication error"));
});

io.on("connect", socket => {
  // JOIN ROOM
  socket.on("joinRoom", async (room, user) => {
    socket.join(room);
    users.addUser(socket.id, user.name, room);
    socket.in(room).emit("usersConnected", users.getUsersByRoom(room));
    socket.emit("usersConnected", users.getUsersByRoom(room));
    const messages = await messageService.getMessagesByRoom(room);
    socket.emit("loadMessages", messages);
  });

  // EXIT ROOM
  socket.on("disconnect", () => {
    const user = users.deleteUser(socket.id);
    if (user) {
      socket
        .in(user.room)
        .emit("usersConnected", users.getUsersByRoom(user.room));
    }
  });

  socket.on("createMsg", async (msg, room) => {
    const user = users.getUserById(socket.id);
    generateMessage(user, msg, user.room);

    if (msg.toLowerCase().includes("di tu frase")) {
      const bot = { name: "bot" };
      const data = await fraseService.getFrase(bot.name);
      generateMessage(bot, data.frase, room);
    }
    if (msg.toLowerCase().includes("kaney")) {
      const message = await kaneyService.saySomethingKaney();
      generateMessage({ name: "Kaney" }, message, room);
      socket.emit("activateKaney", message);
    }
  });

  const generateMessage = async (user, msg, room) => {
    const messageFormat = createMessage(user, msg, room);
    const message = await messageService.createMessage(messageFormat);
    messages.push(message);
    socket.emit("createMsg", message);
    socket.in(room).emit("createMsg", message);
  };
});
