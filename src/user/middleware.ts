import { createMiddleware } from "hono/factory";
import { CreateUserType } from "./validation";
import database from "../common/database";
import { HTTPException } from "hono/http-exception";

export const isUniqueOrThrow = createMiddleware(async (c, next) => {
  const data = await c.req.json<CreateUserType>();
  let countUser = await database.user.count({
    where: { username: data.username },
  });

  if (countUser !== 0) {
    throw new HTTPException(400, { message: "username already exist" });
  }

  if (data.email) {
    countUser = await database.user.count({
      where: { email: data.email },
    });

    if (countUser !== 0) {
      throw new HTTPException(400, { message: "email already exist" });
    }
  }

  await next();
});

export const isExistOrThrow = createMiddleware(async (c, next) => {
  const countUser = await database.user.count({
    where: { username: c.req.param<"id">("id") },
  });

  if (countUser !== 0) {
    throw new HTTPException(404, { message: "user not found" });
  }

  await next();
});
