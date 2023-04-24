import { UserProps } from '@/models/user'
import { SignInProps } from '@/templates/SignIn/validators'
import { ReactNode } from 'react'

export type AuthContextData = {
   user: UserProps | null
   isAuthenticated: boolean
   signOut: () => void
   signIn: (credentials: SignInProps) => Promise<void>
}

export type AuthProviderProps = { children: ReactNode }
