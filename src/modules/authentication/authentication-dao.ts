import type { HydratedDocument } from "mongoose";
import user from "../../models/user";
import TokenModel from "../../models/token";
import type { Token } from "../../models/token";
import tokenStatus from "../../enums/token-status";

function getUserByUsername(username: string) {
	return user.findOne({ username });
}

async function registerToken(token: string) {
	const instance = new TokenModel({ token, status: tokenStatus.active });
	return instance.save();
}

function findToken(token: string) {
	return TokenModel.findOne({ token });
}

async function inactivateToken(tokenInstance: HydratedDocument<Token>) {
	tokenInstance.status = tokenStatus.inactive;
	return tokenInstance.save();
}

export { getUserByUsername, registerToken, findToken, inactivateToken };
