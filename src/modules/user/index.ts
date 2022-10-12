import { Router as router } from "express";
import validateAuth from "../../middlewares/validate-auth";
import requestMiddleware from "../../utils/request-middleware";
import type { User } from "../../models/user";
import * as controller from "./controller";

const routes = router();

routes.post(
	"/users",
	requestMiddleware(async (request, response) => {
		const user = request.body as User;
		await controller.postUser(user);
		response.sendStatus(201);
	})
);
routes.get(
	"/users",
	validateAuth,
	requestMiddleware(async (request, response) => {
		const { username } = request.user as User;
		const user = await controller.getUser(username);
		response.json(user);
	})
);

export default routes;
