import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";
import { createUserSchema } from "./validation";
import {
  createUserService,
  deleteMeService,
  getUserByIdService,
  getUserMeService,
  listUserService,
} from "./services";
import { isUniqueOrThrow } from "./middleware";
import { isAuthorizedOrThrow, isUnauthorizedOrThrow } from "../auth/middleware";
import { deleteCookie, getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

const factory = createFactory();

export const getUserListHandler = factory.createHandlers(async (c) => {
  const users = await listUserService();
  c.status(200);
  return c.json({
    success: true,
    data: { users },
  });
});

export const createUserHandler = factory.createHandlers(
  isUnauthorizedOrThrow,
  isUniqueOrThrow,
  zValidator("json", createUserSchema),
  async (c) => {
    const validatedData = c.req.valid("json");
    const user = await createUserService(validatedData);
    c.status(201);
    return c.json({
      success: true,
      data: { user },
    });
  }
);

export const getByIdHandler = factory.createHandlers(async (c) => {
  const user = await getUserByIdService(c.req.param("id"));
  c.status(200);
  return c.json({
    success: true,
    data: { user },
  });
});

export const getMeHandler = factory.createHandlers(
  isAuthorizedOrThrow,
  async (c) => {
    const token = getCookie(c, "token")!;
    const { id } = await verify(token, process.env.APP_SECRET!);
    const user = await getUserMeService(id as string);

    return c.json({
      success: true,
      data: { user },
    });
  }
);

export const deleteMeHandler = factory.createHandlers(
  isAuthorizedOrThrow,
  async (c) => {
    const token = getCookie(c, "token")!;
    const { id } = await verify(token, process.env.APP_SECRET!);
    await deleteMeService(id as string);
    deleteCookie(c, "token");
    c.status(200);
    return c.json({
      success: true,
      data: {
        message: "user deleted",
      },
    });
  }
);
