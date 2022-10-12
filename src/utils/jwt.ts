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
	if (!config.has("jwt.secret")) {
		throw new Error("JWT Secret not defined into environment variables");
	}

	const secret = config.get<string>("jwt.secret");

	return secret;
}

export { sign, verify };
