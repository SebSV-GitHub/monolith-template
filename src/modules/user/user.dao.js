import User from "../../models/User";

function createUser(user) {
  const instance = new User(user);
  return instance.save();
}

function findUserByUsername(username) {
  return User.findOne({ username });
}

export { createUser, findUserByUsername };
