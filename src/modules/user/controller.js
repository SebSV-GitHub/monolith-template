import AppError from "../../utils/AppError";
import { createUser } from "./user.dao";
import { hash } from "../../utils/password";

async function postUser(user) {
  const { username, password } = user;
  const hashedPassword = await hash(password);
  try {
    return await createUser({
      username,
      password: hashedPassword,
    });
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      throw new AppError(422, "Username already exist");
    }
    throw Error(error);
  }
}

export { postUser };
