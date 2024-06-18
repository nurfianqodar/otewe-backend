import { Hono } from "hono";
import {
  createUserHandler,
  deleteMeHandler,
  getByIdHandler,
  getMeHandler,
  getUserListHandler,
  updateMeHandler,
  updatePasswordMeHandler,
  updateUniqueMeHandler,
} from "./handlers";

const userApp = new Hono();

userApp.get("/", ...getUserListHandler);
userApp.post("/", ...createUserHandler);
userApp.get("/profile/:id", ...getByIdHandler);
userApp.get("/me", ...getMeHandler);
userApp.patch("/me", ...updateMeHandler);
userApp.delete("/me", ...deleteMeHandler);
userApp.patch("/me/update-unique", ...updateUniqueMeHandler);
userApp.patch("/me/update-password", ...updatePasswordMeHandler);

export default userApp;
