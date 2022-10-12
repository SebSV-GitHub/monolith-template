import type { Application } from "express";
import { createLogger } from "@sebsv-github/logger";
import loadMongoose from "./mongoose";
import loadCORS from "./cors";
import loadJSON from "./json";
import loadRequestLogging from "./request-logging";

const logger = createLogger({ label: "Loader" });

async function loadAll(app: Application) {
	logger.debug("Running loaders...");
	loadCORS(app);
	loadJSON(app);
	loadRequestLogging(app);
	await loadMongoose();
}

export default loadAll;
