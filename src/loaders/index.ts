import { createLogger } from "@sebsv-github/logger";
import loadMongoose from "./mongoose";

const logger = createLogger({ label: "Loader" });

async function loadAll() {
	logger.debug("Loading Mongoose");
	await loadMongoose();
}

export default loadAll;
