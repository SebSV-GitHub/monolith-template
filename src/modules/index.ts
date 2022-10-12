import { Router as router } from "express";
import UsersModule from "./user";
import AuthenticationsModule from "./authentication";

const routes = router();

routes.use("/api", UsersModule, AuthenticationsModule);

export default routes;
