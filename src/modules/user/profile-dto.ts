import type { HydratedDocument } from "mongoose";
import type { User } from "../../models/user";

function userDaoToProfileDto(userDAO: HydratedDocument<User>) {
	const { username, email } = userDAO;
	return { username, email };
}

export { userDaoToProfileDto };
