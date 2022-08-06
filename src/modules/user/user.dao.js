import User from "../../models/User";

function createUser(user) {
  const instance = new User(user);
  return instance.save();
}

export { createUser };
