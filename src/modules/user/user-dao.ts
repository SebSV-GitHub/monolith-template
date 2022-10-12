import type { HydratedDocument } from "mongoose";
import UserModel from "../../models/user";
import type { User } from "../../models/user";

async function createUser(user: User) {
	const instance = new UserModel(user);
	return instance.save();
}

async function findUserByUsername(username: string) {
	return UserModel.findOne({ username });
}

export { createUser, findUserByUsername };
