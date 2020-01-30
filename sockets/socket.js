const { io } = require("../app");
const { Users } = require("./classes/users");
const { createMessage } = require("./utils");
const users = new Users();
const messages = [];
const fraseService = require("../api/ditufrase/ditufrase.service");

const messageService = require("../api/messages/message.service");

const jwt = require("jsonwebtoken");

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
    const messageFormat = createMessage(user, msg, room);
    const message = await messageService.createMessage(messageFormat);
    messages.push(message);
    socket.emit("createMsg", message);
    socket.in(user.room).emit("createMsg", message);

    if (msg.toLowerCase().includes("di tu frase")) {
      const username = msg.split("di tu frase ")[1].toLowerCase();
      const bot = { name: username };
      const data = await fraseService.getFrase(username);
      const messageFormat = createMessage(bot, data.frase, room);
      const message = await messageService.createMessage(messageFormat);
      messages.push(message);
      socket.emit("createMsg", message);
      socket.in(room).emit("createMsg", message);
    }
  });
});
