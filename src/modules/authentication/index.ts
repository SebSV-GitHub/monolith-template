import { Router as router } from "express";
import type { Request, Response } from "express-serve-static-core";
import validateAuth from "../../middlewares/validate-auth";
import { getToken } from "../../utils/auth";
import requestMiddleware from "../../utils/request-middleware";
import * as controller from "./controller";

const routes = router();

type Credentials = {
	username: string;
	password: string;
};

routes.post(
	"/authentications",
	requestMiddleware(async (request: Request, response: Response) => {
		const credentials = request.body as Credentials;
		const token = await controller.authenticate(credentials);
		response.json({ token });
	})
);

routes.delete(
	"/authentications",
	validateAuth,
	requestMiddleware(async (request: Request, response: Response) => {
		const { token } = getToken(request);
		await controller.logout(token);
		response.sendStatus(200);
	})
);

export default routes;
