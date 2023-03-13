import type { MongoServerError } from "mongodb";
import AppError from "../../utils/app-error";
import { hash } from "../../utils/password";
import type { User } from "../../models/user";
import cleanString from "../../utils/string";
import { createUser, findUserByUsername } from "./user-dao";
import { userDaoToProfileDto } from "./profile-dto";

async function postUser(user: User) {
	const { password, username } = user;
	const sanitizedUsername = cleanString(username);
	const hashedPassword = await hash(password);
	try {
		return await createUser({
			...user,
			password: hashedPassword,
			username: sanitizedUsername,
		});
	} catch (error: unknown) {
		console.log(typeof error);
		if (
			error instanceof Error &&
			error.name === "MongoServerError" &&
			(error as MongoServerError).code === 11_000
		) {
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
