import process from "node:process";
import jwt from "jsonwebtoken";
import config from "config";

function sign(payload: Record<string, any>) {
	if (!config.has("jwt.expiration")) {
		throw new Error("JWT expiration time not set");
	}

	return jwt.sign(payload, getSecret(), {
		expiresIn: config.get<string>("jwt.expiration"),
	});
}

function verify(token: string) {
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
