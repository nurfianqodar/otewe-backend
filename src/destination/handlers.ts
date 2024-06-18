import { createFactory } from "hono/factory";
import {
  createDestinationService,
  deleteDestinationByIdService,
  getDestinationByIdService,
  getDestinationListService,
  updateDestinationByIdService,
} from "./services";
import { zValidator } from "@hono/zod-validator";
import { createDestinationSchema, updateDestinationSchema } from "./validation";
import { isAuthorizedOrThrow } from "../auth/middleware";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { isDestinationExistOrThrow, isOwnerOrThrow } from "./middleware";

const factory = createFactory();

export const createDestinationHandler = factory.createHandlers(
  isAuthorizedOrThrow,
  zValidator("json", createDestinationSchema),
  async (c) => {
    const token = getCookie(c, "token")!;
    const { id } = await verify(token, process.env.APP_SECRET!);
    const validatedData = c.req.valid("json");
    const destination = await createDestinationService(
      id as string,
      validatedData
    );
    c.status(201);
    return c.json({
      success: true,
      data: { destination },
    });
  }
);

export const getDestinationListHandler = factory.createHandlers(async (c) => {
  const destinations = await getDestinationListService();
  c.status(200);
  return c.json({
    success: true,
    data: {
      destinations,
    },
  });
});

export const getDestinationByIdHandler = factory.createHandlers(
  isDestinationExistOrThrow,
  async (c) => {
    const id = c.req.param("id");
    const destination = await getDestinationByIdService(id);
    c.status(200);
    return c.json({ success: true, data: { destination } });
  }
);

export const updateDestinationByIdHandler = factory.createHandlers(
  isAuthorizedOrThrow,
  isDestinationExistOrThrow,
  isOwnerOrThrow,
  zValidator("json", updateDestinationSchema),
  async (c) => {
    const destinationId = c.req.param("id");
    const validatedData = c.req.valid("json");
    const destination = await updateDestinationByIdService(
      destinationId,
      validatedData
    );

    return c.json(
      {
        success: true,
        data: { destination },
      },
      201
    );
  }
);

export const deleteDestinationByIdHandler = factory.createHandlers(
  isAuthorizedOrThrow,
  isDestinationExistOrThrow,
  isOwnerOrThrow,
  async (c) => {
    const destinationId = c.req.param("id");
    await deleteDestinationByIdService(destinationId);
    return c.json(
      {
        success: true,
        data: {
          message: "destination deleted",
        },
      },
      200
    );
  }
);
