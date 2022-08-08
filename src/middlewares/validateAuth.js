import TokenStatus from "../enums/TokenStatus";
import { findToken } from "../modules/authentication/authentication.dao";
import AppError from "../utils/AppError";
import { getToken } from "../utils/auth";
import { verify } from "../utils/jwt";

async function validateAuth(req, _res, next) {
  try {
    const { prefix, token } = getToken(req);
    if (!prefix || prefix !== "Bearer") {
      return next(new AppError(401, "Invalid token prefix"));
    }
    const user = verify(token);

    const instance = await findToken(token);

    if (!instance || instance.status === TokenStatus.INACTIVE) {
      return next(new AppError(401, "Invalid token"));
    }

    req.user = user;

    next();
  } catch (error) {
    return next(error);
  }
}

export default validateAuth;
