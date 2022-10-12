import cors from "cors";
import type { Application } from "express";
import { createLogger } from "@sebsv-github/logger";

function load(app: Application) {
	const logger = createLogger({ label: "CORS loader" });
	logger.debug("Loading CORS configuration");
	app.use(cors());
}

export default load;
