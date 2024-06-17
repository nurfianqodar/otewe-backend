import { Hono } from "hono";
import { loginHandler, logoutHandler } from "./handlers";

const authApp = new Hono();

authApp.post("/", ...loginHandler);
authApp.delete("/", ...logoutHandler);

export default authApp;
