import { Schema, model } from "mongoose";

type User = {
	username: string;
	email: string;
	password: string;
};

const userSchema = new Schema<User>({
	username: {
		type: String,
		unique: true,
	},
	email: {
		type: String,
		unique: true,
	},
	password: String,
});

const user = model<User>("User", userSchema);

export default user;
export type { User };
