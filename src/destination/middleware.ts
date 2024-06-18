import { createMiddleware } from "hono/factory";
import database from "../common/database";
import { verify } from "hono/jwt";
import { getCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";

export const isOwnerOrThrow = createMiddleware(async (c, next) => {
  const id = c.req.param("id");
  const destination = await database.destination.findUnique({ where: { id } });
  const payload = await verify(getCookie(c, "token")!, process.env.APP_SECRET!);

  if (!destination) {
    throw new HTTPException(404, { message: "destination not found" });
  }
  if (!(destination.userId === payload.id)) {
    throw new HTTPException(403, { message: "you are not owner" });
  }
  await next();
});

export const isDestinationExistOrThrow = createMiddleware(async (c, next) => {
  const id = c.req.param("id");
  const destination = await database.destination.findUnique({ where: { id } });

  if (!destination) {
    throw new HTTPException(404, { message: "destination not found" });
  }

  await next();
});
