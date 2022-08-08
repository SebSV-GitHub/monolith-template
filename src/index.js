import express, { json } from "express";
import cors from "cors";
import load from "./loaders";
import modules from "./modules";
import errorHandler from "./middlewares/errorHandler";

const app = new express();

app.use(json());
app.use(cors());

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
  console.log(`App running on port ${PORT}`);
});
