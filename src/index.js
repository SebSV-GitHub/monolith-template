import express, { json } from "express";
import cors from "cors";
import load from "./loaders";
import modules from "./modules";
import errorHandler from "./middlewares/errorHandler";
import requestLogging, { createLogger } from "@sebsv-github/logger";

const app = new express();
const logger = createLogger({ label: "App" });

logger.debug("Using JSON");
app.use(json());
logger.debug("Using CORS");
app.use(cors());
logger.debug("Using request logging");
app.use(requestLogging);

logger.debug("Running loaders");
load();

logger.debug("Registering health check endpoint");
app.get("/api/health-check", (_req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
  });
});

logger.debug("Registering modules");
app.use(modules);

logger.debug("Using error handler");
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  logger.info(`App running on port ${PORT}`);
});
