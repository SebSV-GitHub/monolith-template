import { Router } from "express";
import validateAuth from "../../middlewares/validateAuth";
import { getToken } from "../../utils/auth";
import requestMiddleware from "../../utils/requestMiddleware";
import * as controller from "./controller";

const router = Router();

router.post(
  "/authentications",
  requestMiddleware(async (req, res) => {
    const credentials = req.body;
    const token = await controller.authenticate(credentials);
    res.json({ token });
  })
);

router.delete(
  "/authentications",
  validateAuth,
  requestMiddleware(async (req, res) => {
    const { token } = getToken(req);
    await controller.logout(token);
    res.sendStatus(200);
  })
);

export default router;
