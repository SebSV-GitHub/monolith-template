import type {
	Request,
	Response,
	NextFunction,
} from "express-serve-static-core";
import tokenStatus from "../enums/token-status";
import { findToken } from "../modules/authentication/authentication-dao";
import AppError from "../utils/app-error";
import { getToken } from "../utils/auth";
import { verify } from "../utils/jwt";

async function validateAuth(
	request: Request,
	_response: Response,
	next: NextFunction
) {
	try {
		const { prefix, token } = getToken(request);
		if (!prefix || prefix !== "Bearer") {
			next(new AppError(401, "Invalid token prefix"));
			return;
		}

		const user = verify(token);

		const instance = await findToken(token);

		if (!instance || instance.status === tokenStatus.inactive) {
			next(new AppError(401, "Invalid token"));
			return;
		}

		request.user = user;

		next();
	} catch (error: unknown) {
		next(error);
	}
}

export default validateAuth;
