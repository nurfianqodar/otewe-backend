import { createFactory } from "hono/factory";
import { isAuthorizedOrThrow, isUnauthorizedOrThrow } from "./middleware";
import { loginSchema } from "./validation";
import { loginService } from "./services";
import { setCookie, deleteCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";

const factory = createFactory();

export const loginHandler = factory.createHandlers(
  isUnauthorizedOrThrow,
  zValidator("json", loginSchema),
  async (c) => {
    const { password, username } = await c.req.valid("json");
    const token = await loginService(username, password);
    setCookie(c, "token", token);
    return c.json({
      success: true,
      data: {
        token,
      },
    });
  }
);

export const logoutHandler = factory.createHandlers(
  isAuthorizedOrThrow,
  async (c) => {
    deleteCookie(c, "token");
    c.status(200);
    return c.json({
      success: true,
      data: {
        message: "logout success",
      },
    });
  }
);
