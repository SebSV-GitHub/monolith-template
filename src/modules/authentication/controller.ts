import { verify } from "../../utils/password";
import { sign } from "../../utils/jwt";
import AppError from "../../utils/app-error";
import cleanString from "../../utils/string";
import {
	findToken,
	getUserByUsername,
	inactivateToken,
	registerToken,
} from "./authentication-dao";

async function authenticate(credentials: {
	username: string;
	password: string;
}) {
	const { username, password } = credentials;
	const user = await getUserByUsername(cleanString(username));
	if (!user) {
		throw new AppError(403, "Invalid Credential");
	}

	if (!(await verify(user.password, password))) {
		throw new AppError(403, "Invalid Credentials");
	}

	const token = sign({ username: user.username });
	await registerToken(token);

	return token;
}

async function logout(token: string) {
	const tokenInstance = await findToken(token);
	if (tokenInstance) {
		return inactivateToken(tokenInstance);
	}

	throw new AppError(500, "Token not found");
}

export { authenticate, logout };
