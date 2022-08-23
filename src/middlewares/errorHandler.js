import AppError from "../utils/AppError";
import { createLogger } from "@sebsv-github/logger";

const logger = createLogger({ label: "Error handler" });

const errorHandler = (err, _req, res, next) => {
  logger.error(err.message);
  if (!(err instanceof AppError)) {
    res.status(500).json({ message: "Unknown error ocurred" });
    return next();
  }
  res.status(err.status).json({ message: err.description });
  next();
};

export default errorHandler;
