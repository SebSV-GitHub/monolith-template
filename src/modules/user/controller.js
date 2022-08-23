import AppError from "../../utils/AppError";
import { createUser, findUserByUsername } from "./user.dao";
import { hash } from "../../utils/password";
import { userDAOToProfileDTO } from "./Profile.dto";

async function postUser(user) {
  const { password } = user;
  const hashedPassword = await hash(password);
  try {
    return await createUser({
      ...user,
      password: hashedPassword,
    });
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      throw new AppError(409, "Username or email already exists");
    }
    throw Error(error);
  }
}

async function getUser(username) {
  const userDAO = await findUserByUsername(username);
  return userDAOToProfileDTO(userDAO);
}

export { postUser, getUser };
