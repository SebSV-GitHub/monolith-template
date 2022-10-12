import { Schema, model } from "mongoose";

type Credentials = {
	username: string;
	password: string;
};

type User = {
	email: string;
} & Credentials;

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
export type { User, Credentials };
