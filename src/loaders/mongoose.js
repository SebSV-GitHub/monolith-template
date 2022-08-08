import mongoose from "mongoose";
import config from "config";

async function load() {
  let uri = `mongodb://${_generateCredentials()}${config.get(
    "db.host"
  )}:${config.get("db.port")}/${config.get("db.database")}`;
  try {
    await mongoose.connect(uri);
    console.log("Database connected");
  } catch (error) {
    throw Error(error);
  }
}

function _generateCredentials() {
  if (config.has("db.username") && config.has("db.password")) {
    const username = config.get("db.username");
    const password = config.get("db.password");
    if (username === "" || password === "") {
      return "";
    }
    return `${config.get("db.username")}:${config.get("db.password")}@`;
  }
}

export default load;
