import { sign } from "hono/jwt";
import database from "../common/database";
import { HTTPException } from "hono/http-exception";
import * as bcrypt from "bcrypt";

export const loginService = async (username: string, password: string) => {
  const user = await database.user.findUnique({ where: { username } });
  if (!user) {
    throw new HTTPException(403, { message: "incorrect username or password" });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new HTTPException(403, { message: "incorrect username or password" });
  }

  const jwtPayload = {
    id: user.id,
    username: user.username,
  };

  return sign(jwtPayload, process.env.APP_SECRET!);
};
