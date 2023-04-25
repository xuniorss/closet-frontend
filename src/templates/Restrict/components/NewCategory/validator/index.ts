import { z } from 'zod'

export const schemaModels = z.object({
   modelname: z
      .string()
      .min(1, { message: 'Informe pelo menos uma letra para identificar' })
      .max(100, { message: 'Quantidade de caracter permitido atingido.' }),
   description: z
      .string()
      .max(200, { message: 'Quantidade de caracter permitido atingido.' })
      .nullable()
      .optional(),
})

export type ModelProps = z.infer<typeof schemaModels>
