class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }

  getUsers() {
    return this.users;
  }

  getUserById(id) {
    const user = this.users.filter(user => user.id === id)[0];
    return user;
  }

  deleteUser(id) {
    const deletedUser = this.getUserById(id);
    this.users = this.users.filter(user => user.id !== id);
    return deletedUser;
  }

  getUsersByRoom(room) {
    const users = this.users.filter(user => user.room === room);
    return users;
  }
}

module.exports = { Users };
