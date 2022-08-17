import loadMongoose from "./mongoose";
import { createLogger } from "@sebsv-github/logger";

const logger = createLogger({ label: "Loader" });

function loadAll() {
  logger.debug("Loading Mongoose");
  loadMongoose();
}

export default loadAll;
