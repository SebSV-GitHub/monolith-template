import { Router as router } from "express";
import type { Request, Response } from "express";
import requestMiddleware from "../../utils/request-middleware";
import validateAuth from "../../middlewares/validate-auth";

const routes = router();

routes.get(
	"/transactions",
	validateAuth,
	requestMiddleware(async (request: Request, response: Response) => {
		const transactions = Array.from({ length: 100 }).map((_, index) => ({
			id: index,
			date: Date.now(),
			description: "Test",
			branch: "Test",
			discount: Math.random() * 1_000_000,
			value: Math.random() * 1_000_000,
			balance: Math.random() * 1_000_000,
		}));
		response.json(transactions);
	})
);

export default routes;
