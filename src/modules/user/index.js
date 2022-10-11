import { Router } from "express";
import validateAuth from "../../middlewares/validate-auth";
import requestMiddleware from "../../utils/request-middleware";
import * as controller from "./controller";

const router = new Router();

router.post(
	"/users",
	requestMiddleware(async (request, response) => {
		const user = request.body;
		await controller.postUser(user);
		response.sendStatus(201);
	})
);

router.get(
	"/users",
	validateAuth,
	requestMiddleware(async (request, response) => {
		const { username } = request.user;
		const user = await controller.getUser(username);
		response.json(user);
	})
);

export default router;
