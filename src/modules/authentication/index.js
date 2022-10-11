import { Router } from "express";
import validateAuth from "../../middlewares/validate-auth";
import { getToken } from "../../utils/auth";
import requestMiddleware from "../../utils/request-middleware";
import * as controller from "./controller";

const router = new Router();

router.post(
	"/authentications",
	requestMiddleware(async (request, response) => {
		const credentials = request.body;
		const token = await controller.authenticate(credentials);
		response.json({ token });
	})
);

router.delete(
	"/authentications",
	validateAuth,
	requestMiddleware(async (request, response) => {
		const { token } = getToken(request);
		await controller.logout(token);
		response.sendStatus(200);
	})
);

export default router;
