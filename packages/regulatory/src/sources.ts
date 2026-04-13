import { z } from "zod";

export const BaremeSourceSchema = z.object({
  label: z.string(),
  url: z.string().url(),
  date_consultation: z.string().datetime(),
});

export type BaremeSource = z.infer<typeof BaremeSourceSchema>;
