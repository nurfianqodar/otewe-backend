import database from "../common/database";
import { CreateDestinationType, UpdateDestinationType } from "./validation";
import { HTTPException } from "hono/http-exception";

export const createDestinationService = async (
  userId: string,
  validatedData: CreateDestinationType
) => {
  const destination = await database.destination.create({
    data: {
      userId,
      ...validatedData,
    },
  });

  return destination;
};

export const getDestinationListService = async () => {
  const destinations = database.destination.findMany({
    select: { id: true, name: true, description: true, district: true },
  });
  return destinations;
};

export const getDestinationByIdService = async (destinationId: string) => {
  const destination = await database.destination.findUnique({
    where: {
      id: destinationId,
    },
  });

  return destination;
};

export const updateDestinationByIdService = async (
  destinationId: string,
  validatedData: UpdateDestinationType
) => {
  const destination = await database.destination.update({
    where: { id: destinationId },
    data: validatedData,
  });
  return destination;
};

export const deleteDestinationByIdService = async (destinationId: string) => {
  await database.destination.delete({ where: { id: destinationId } });
};
