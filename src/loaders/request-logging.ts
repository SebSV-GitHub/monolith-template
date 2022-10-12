import requestLoggingMiddleware, { createLogger } from "@sebsv-github/logger";
import type { Application } from "express";

const logger = createLogger({ label: "Request logging loader" });
function load(app: Application) {
	logger.debug("Loading request logging middleware");
	app.use(requestLoggingMiddleware);
}

export default load;
