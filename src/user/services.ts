import database from "../common/database";
import * as bcrypt from "bcrypt";
import {
  CreateUserType,
  UpdateEmailUserType,
  UpdatePasswordUserType,
  UpdateUserType,
  UpdateUsernameUserType,
} from "./validation";
import { HTTPException } from "hono/http-exception";

export const createUserService = async (validatedData: CreateUserType) => {
  validatedData.password = await bcrypt.hash(validatedData.password, 10);
  const user = await database.user.create({
    data: validatedData,
    select: { username: true, firstName: true },
  });
  return user;
};

export const listUserService = async () => {
  const users = await database.user.findMany({
    select: { id: true, username: true },
  });
  return users;
};

export const getUserByIdService = async (id: string) => {
  const user = await database.user.findUnique({
    where: { id },
    select: { username: true, firstName: true, lastName: true },
  });

  if (!user) {
    throw new HTTPException(404, { message: "user not found" });
  }

  return user;
};

export const getUserMeService = async (idMe: string) => {
  const user = await database.user.findUnique({
    where: { id: idMe },
    select: {
      id: true,
      username: true,
      email: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

export const deleteMeService = async (idMe: string) => {
  await database.user.delete({ where: { id: idMe } });
};

export const updateMeService = async (validatedData: UpdateUserType) => {};

export const updatePasswordMe = async (
  validatedData: UpdatePasswordUserType
) => {};

export const updateEmailMe = async (validatedData: UpdateEmailUserType) => {};

export const updateUsernameMe = async (
  validatedData: UpdateUsernameUserType
) => {};
