const { io } = require("../app");
const { Users } = require("./classes/users");
const { createMessage } = require("./utils");
const users = new Users();
const messages = [];

io.on("connect", socket => {
  // JOIN ROOM
  socket.on("joinRoom", (room, user) => {
    socket.join(room);
    users.addUser(socket.id, user.name, room);
    socket.in(room).emit("usersConnected", users.getUsersByRoom(room));
    socket.emit("usersConnected", users.getUsersByRoom(room));
    const messagesByRoom = messages.filter(message => message.room === room);
    socket.emit("loadMessages", messagesByRoom);
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

  socket.on("createMsg", (msg, room) => {
    const user = users.getUserById(socket.id);
    const message = createMessage(user, msg, room);
    messages.push(message);
    socket.emit("createMsg", message);
    socket.in(user.room).emit("createMsg", message);
  });
});
