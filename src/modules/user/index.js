import { Router } from "express";
import validateAuth from "../../middlewares/validateAuth";
import requestMiddleware from "../../utils/requestMiddleware";
import * as controller from "./controller";

const router = Router();

router.post(
  "/users",
  requestMiddleware(async (req, res) => {
    const user = req.body;
    await controller.postUser(user);
    res.sendStatus(201);
  })
);

router.get(
  "/users",
  validateAuth,
  requestMiddleware(async (req, res) => {
    const { username } = req.user;
    const user = await controller.getUser(username);
    res.json(user);
  })
);

export default router;
