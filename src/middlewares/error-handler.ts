import type { ErrorRequestHandler } from "express";
import { createLogger } from "@sebsv-github/logger";
import AppError from "../utils/app-error";

const logger = createLogger({ label: "Error handler" });

const errorHandler: ErrorRequestHandler = (error, _request, response, next) => {
	logger.error(error.message);
	if (!(error instanceof AppError)) {
		response.status(500).json({ message: "Unknown error ocurred" });
		next();
		return;
	}

	response.status(error.status).json({ message: error.description });
	next();
};

export default errorHandler;
