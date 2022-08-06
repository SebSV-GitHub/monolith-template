import { Schema, model } from "mongoose";
import TokenStatus from "../enums/TokenStatus";

const TokenSchema = new Schema({
  token: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    enum: Object.values(TokenStatus),
  },
});

const Token = model("Token", TokenSchema);

export default Token;
