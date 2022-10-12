import process from "node:process";
import express, { json } from "express";
import cors from "cors";
import requestLogging, { createLogger } from "@sebsv-github/logger";
import load from "./loaders";
import modules from "./modules";
import errorHandler from "./middlewares/error-handler";

const app = express();
const logger = createLogger({ label: "App" });

logger.debug("Using JSON");
app.use(json());
logger.debug("Using CORS");
app.use(cors());
logger.debug("Using request logging");
app.use(requestLogging);

logger.debug("Running loaders");
load()
	.then(() => null)
	.catch(() => null);

logger.debug("Registering health check endpoint");
app.get("/api/health-check", (_request, response) => {
	response.json({
		status: "ok",
		uptime: process.uptime(),
	});
});

logger.debug("Registering modules");
app.use(modules);

logger.debug("Using error handler");
app.use(errorHandler);

const port = process.env.PORT ?? 8080;

app.listen(port, () => {
	logger.info(`App running on port ${port}`);
});
