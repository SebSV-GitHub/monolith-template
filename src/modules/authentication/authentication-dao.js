import User from "../../models/user";
import Token from "../../models/token";
import TokenStatus from "../../enums/token-status";

function getUserByUsername(username) {
	return User.findOne({ username });
}

function registerToken(token) {
	const instance = new Token({ token, status: TokenStatus.ACTIVE });
	return instance.save();
}

function findToken(token) {
	return Token.findOne({ token });
}

function inactivateToken(tokenInstance) {
	tokenInstance.status = TokenStatus.INACTIVE;
	return tokenInstance.save();
}

export { getUserByUsername, registerToken, findToken, inactivateToken };
