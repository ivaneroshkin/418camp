import { z } from 'zod';

export const moveSchema = z.object({
  y: z.number().int().min(0).max(2),
  x: z.number().int().min(0).max(2),
});

export type MoveRequest = z.infer<typeof moveSchema>;
