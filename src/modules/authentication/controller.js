import {
  findToken,
  getUserByUsername,
  inactivateToken,
  registerToken,
} from "./authentication.dao";
import { verify } from "../../utils/password";
import { sign } from "../../utils/jwt";
import AppError from "../../utils/AppError";

async function authenticate(credentials) {
  const { username, password } = credentials;
  const user = await getUserByUsername(username);
  if (!user) {
    throw AppError(403, "Invalid Credential");
  }
  if (!(await verify(user.password, password))) {
    throw AppError(403, "Invalid Credentials");
  }

  const token = sign({ username: user.username });
  await registerToken(token);

  return token;
}

async function logout(token) {
  const tokenInstance = await findToken(token);
  return inactivateToken(tokenInstance);
}

export { authenticate, logout };
