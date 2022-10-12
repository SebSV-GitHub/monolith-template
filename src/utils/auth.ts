import type { Request } from "express-serve-static-core";
import AppError from "./app-error";

function getToken(request: Request) {
	const authHeader = request.get("Authorization");
	if (!authHeader) {
		throw new AppError(401, "No authorization header");
	}

	const [prefix, token] = authHeader.split(" ");
	return { prefix, token };
}

export { getToken };
