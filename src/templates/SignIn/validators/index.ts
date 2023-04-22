import { z } from 'zod'

export const schemaSignIn = z.object({
   email: z.string().email({ message: 'O email informado é invalido' }),
   password: z.string().min(8, { message: 'Senha deve conter no mínimo 8 caracteres' }),
})

export type SignInProps = z.infer<typeof schemaSignIn>
