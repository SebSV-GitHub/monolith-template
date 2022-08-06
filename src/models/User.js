import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
});

const User = model("User", UserSchema);

export default User;
