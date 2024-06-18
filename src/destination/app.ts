import { Hono } from "hono";
import {
  createDestinationHandler,
  deleteDestinationByIdHandler,
  getDestinationByIdHandler,
  getDestinationListHandler,
  updateDestinationByIdHandler,
} from "./handlers";

const destinationApp = new Hono();

destinationApp.get("/", ...getDestinationListHandler);
destinationApp.post("/", ...createDestinationHandler);
destinationApp.get("/:id", ...getDestinationByIdHandler);
destinationApp.patch("/:id", ...updateDestinationByIdHandler);
destinationApp.delete("/:id", ...deleteDestinationByIdHandler);

export default destinationApp;
