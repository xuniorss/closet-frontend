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

export const schemaProducts = z.object({
   product_code: z.string().min(1, { message: 'Código obrigatório' }).max(10),
   product_name: z
      .string()
      .min(1, { message: 'O nome da mercadoria deve ser informado' })
      .max(200, { message: 'Nome não pode ultrapassar 200 caracteres.' }),
   model_id: z.string().uuid(),
   size: z.string().toLowerCase(),
   price: z.string(),
   quantity: z.number().positive({ message: 'Quantidade deve ser positiva' }),
   description: z.string().max(500).optional(),
   image_id: z.number().optional(),
   image_url: z.string().url().optional(),
})

export type ProductsProps = z.infer<typeof schemaProducts>
