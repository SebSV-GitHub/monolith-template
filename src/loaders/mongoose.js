import mongoose from "mongoose";
import config from "config";
import { createLogger } from "@sebsv-github/logger";

async function load() {
  const logger = createLogger({ label: "Mongoose" });

  let uri = `mongodb://${_generateCredentials()}${config.get(
    "db.host"
  )}:${config.get("db.port")}/${config.get("db.database")}`;
  try {
    await mongoose.connect(uri);
    logger.info("Database connected");
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
