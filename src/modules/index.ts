import { Router as router } from "express";
import UsersModule from "./user";
import AuthenticationsModule from "./authentication";
import TransactionsModule from "./transactions";

const routes = router();

routes.use("/api", UsersModule, AuthenticationsModule, TransactionsModule);

export default routes;
