import { z } from 'zod'

export const schemaCollection = z.object({
   name: z.string().min(1).max(30).toUpperCase(),
   modelId: z.string().uuid(),
   numItems: z.number().default(3),
   finalDate: z.date(),
   showHome: z.boolean().default(false),
})

export type CollectionProps = z.infer<typeof schemaCollection>
