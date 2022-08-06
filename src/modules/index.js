import { Router } from "express";
import UsersModule from "./user";
import AuthenticationsModule from "./authentication";

const router = Router();

router.use("/api", UsersModule, AuthenticationsModule);

export default router;
