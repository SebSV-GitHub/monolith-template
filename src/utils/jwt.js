import process from "node:process";
import jwt from "jsonwebtoken";
import config from "config";

function sign(payload) {
	if (!config.has("jwt.expiration")) {
		throw new Error("JWT expiration time not set");
	}

	return jwt.sign(payload, getSecret(), {
		expiresIn: config.get("jwt.expiration"),
	});
}

function verify(token) {
	return jwt.verify(token, getSecret());
}

function getSecret() {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error("JWT Secret not defined into environment variables");
	}

	return secret;
}

export { sign, verify };
