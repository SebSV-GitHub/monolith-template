import { Schema, model } from "mongoose";
import tokenStatus from "../enums/token-status";

type Token = {
	token: string;
	status: string;
};

const tokenSchema = new Schema<Token>({
	token: {
		type: String,
		unique: true,
	},
	status: {
		type: String,
		enum: Object.values(tokenStatus),
	},
});

const tokenModel = model<Token>("Token", tokenSchema);

export default tokenModel;
export type { Token };
