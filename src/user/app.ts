import { Hono } from "hono";
import {
  createUserHandler,
  deleteMeHandler,
  getByIdHandler,
  getMeHandler,
  getUserListHandler,
} from "./handlers";

const userApp = new Hono();

userApp.get("/", ...getUserListHandler);
userApp.post("/", ...createUserHandler);
userApp.get("/profile/:id", ...getByIdHandler);

userApp.get("/me", ...getMeHandler);
userApp.patch("/me", async (c) => {});
userApp.delete("/me", ...deleteMeHandler);
userApp.patch("/me/update-password", async (c) => {});

export default userApp;
