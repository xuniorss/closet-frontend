import { z } from 'zod'

export const schemaSizes = z.object({
   size: z.string().min(1).max(5),
   description: z.string().max(100).nullable().optional(),
})

export type SizeProps = z.infer<typeof schemaSizes>
