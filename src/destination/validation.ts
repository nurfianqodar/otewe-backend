import { z } from "zod";

export const createDestinationSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  province: z.string().optional(),
  district: z.string().optional(),
  subdistrict: z.string().optional(),
  village: z.string().optional(),
  address: z.string().optional(),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
});
export type CreateDestinationType = z.infer<typeof createDestinationSchema>;

export const updateDestinationSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  province: z.string().optional(),
  district: z.string().optional(),
  subdistrict: z.string().optional(),
  village: z.string().optional(),
  address: z.string().optional(),
  longitude: z.string().optional(),
  latitude: z.string().optional(),
});
export type UpdateDestinationType = z.infer<typeof updateDestinationSchema>;
