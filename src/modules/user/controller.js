import AppError from "../../utils/app-error";
import { hash } from "../../utils/password";
import { createUser, findUserByUsername } from "./user-dao";
import { userDAOToProfileDTO } from "./profile-dto";

async function postUser(user) {
	const { password } = user;
	const hashedPassword = await hash(password);
	try {
		return await createUser({
			...user,
			password: hashedPassword,
		});
	} catch (error) {
		if (error.name === "MongoServerError" && error.code === 11_000) {
			throw new AppError(409, "Username or email already exists");
		}

		throw new Error(error);
	}
}

async function getUser(username) {
	const userDAO = await findUserByUsername(username);
	return userDAOToProfileDTO(userDAO);
}

export { postUser, getUser };
