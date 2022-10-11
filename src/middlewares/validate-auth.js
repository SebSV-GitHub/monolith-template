import TokenStatus from "../enums/token-status";
import { findToken } from "../modules/authentication/authentication-dao";
import AppError from "../utils/app-error";
import { getToken } from "../utils/auth";
import { verify } from "../utils/jwt";

async function validateAuth(request, _response, next) {
	try {
		const { prefix, token } = getToken(request);
		if (!prefix || prefix !== "Bearer") {
			return next(new AppError(401, "Invalid token prefix"));
		}

		const user = verify(token);

		const instance = await findToken(token);

		if (!instance || instance.status === TokenStatus.INACTIVE) {
			return next(new AppError(401, "Invalid token"));
		}

		request.user = user;

		next();
	} catch (error) {
		return next(error);
	}
}

export default validateAuth;
