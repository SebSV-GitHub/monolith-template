import { createLogger } from "@sebsv-github/logger";
import loadMongoose from "./mongoose";

const logger = createLogger({ label: "Loader" });

function loadAll() {
	logger.debug("Loading Mongoose");
	loadMongoose();
}

export default loadAll;
