import process from "node:process";
import express from "express";
import requestLogging, { createLogger } from "@sebsv-github/logger";
import load from "./loaders";
import modules from "./modules";
import errorHandler from "./middlewares/error-handler";

async function createApp() {
	const app = express();
	const logger = createLogger({ label: "App" });

	logger.debug("Running loaders");
	await load(app);

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

	return app;
}

export default createApp;
