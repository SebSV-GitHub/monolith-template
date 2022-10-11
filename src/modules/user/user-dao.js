import User from "../../models/user";

function createUser(user) {
	const instance = new User(user);
	return instance.save();
}

function findUserByUsername(username) {
	return User.findOne({ username });
}

export { createUser, findUserByUsername };
