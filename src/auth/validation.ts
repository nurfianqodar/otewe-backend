import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
export type LoginType = z.infer<typeof loginSchema>;
