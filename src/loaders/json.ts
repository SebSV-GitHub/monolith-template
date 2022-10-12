import { json } from "express";
import type { Application } from "express";
import { createLogger } from "@sebsv-github/logger";

function load(app: Application) {
	const logger = createLogger({ label: "JSON loader" });
	logger.debug("Loading JSON configuration");
	app.use(json());
}

export default load;
