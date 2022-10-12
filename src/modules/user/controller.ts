import { MongoServerError } from "mongodb";
import AppError from "../../utils/app-error";
import { hash } from "../../utils/password";
import type { User } from "../../models/user";
import { createUser, findUserByUsername } from "./user-dao";
import { userDaoToProfileDto } from "./profile-dto";

async function postUser(user: User) {
	const { password } = user;
	const hashedPassword = await hash(password);
	try {
		return await createUser({
			...user,
			password: hashedPassword,
		});
	} catch (error: unknown) {
		console.log(typeof error);
		if (error instanceof MongoServerError && error.code === 11_000) {
			throw new AppError(409, "Username or email already exists");
		}

		throw error;
	}
}

async function getUser(username: string) {
	const userDao = await findUserByUsername(username);
	if (userDao) {
		return userDaoToProfileDto(userDao);
	}
}

export { postUser, getUser };
