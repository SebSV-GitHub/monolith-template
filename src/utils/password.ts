import argon2 from "argon2";

async function hash(password: string) {
	return argon2.hash(password);
}

async function verify(hashedPassword: string, password: string) {
	return argon2.verify(hashedPassword, password);
}

export { hash, verify };
