import express, { json } from "express";
import cors from "cors";
import load from "./loaders";
import modules from "./modules";
import errorHandler from "./middlewares/errorHandler";
import requestLogging, { createLogger } from "@sebsv-github/logger";

const app = new express();
const logger = createLogger({ label: "App" });

app.use(json());
app.use(cors());
app.use(requestLogging);

load();

app.get("/api/health-check", (_req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
  });
});

app.use(modules);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  logger.info(`App running on port ${PORT}`);
});
