import { nanoid } from "nanoid";
import { z } from "zod";

// Create User
export const createUserSchema = z.object({
  id: z.string().default(nanoid(10)),
  username: z.string().min(3).max(16),
  password: z.string().min(8).max(64),
  email: z.string().email().max(32).optional(),
  firstName: z.string().max(24),
  lastName: z.string().max(24).optional(),
});
export type CreateUserType = z.infer<typeof createUserSchema>;

// Update User
export const updateUserSchema = z.object({
  firstName: z.string().max(24).optional(),
  lastName: z.string().max(24).optional(),
});
export type UpdateUserType = z.infer<typeof updateUserSchema>;

// Update User
export const updateUserPasswordSchema = z.object({
  password: z.string().min(8).max(64),
});
export type UpdatePasswordUserType = z.infer<typeof updateUserPasswordSchema>;

// Update Username
export const updateUserUniqueSchema = z.object({
  username: z.string().min(3).max(32).optional(),
  email: z.string().email().max(32).optional(),
});
export type UpdateUniqueUserType = z.infer<typeof updateUserUniqueSchema>;
