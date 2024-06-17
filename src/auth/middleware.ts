import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";

export const isUnauthorizedOrThrow = createMiddleware(async (c, next) => {
  const tokenCookie = getCookie(c, "token");
  if (tokenCookie) {
    throw new HTTPException(403, { message: "you already signed in" });
  }
  await next();
});

export const isAuthorizedOrThrow = createMiddleware(async (c, next) => {
  const tokenCookie = getCookie(c, "token");
  if (!tokenCookie) {
    throw new HTTPException(403, { message: "unauthorized" });
  }
  await next();
});
