import { api } from '@/services/apiClient'
import { userApi } from '@/services/apis'
import { SignInProps } from '@/templates/SignIn/validators'
import { useRouter } from 'next/navigation'
import { destroyCookie, setCookie } from 'nookies'
import { createContext, useCallback } from 'react'

import { AuthContextData, AuthProviderProps } from '../models/AuthContex'
import { useUser } from './utils/reducerUser'

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
   const [state, dispatch] = useUser({ user: null })
   const router = useRouter()

   const signOut = useCallback(() => {
      try {
         destroyCookie(undefined, `${process.env.NEXT_PUBLIC_COOKIES}`)
         localStorage.removeItem(`${process.env.NEXT_PUBLIC_COOKIES}`)

         dispatch({ type: 'USER', payload: { user: null } })
      } catch (error) {
         console.error(error)
      }
   }, [dispatch])

   const signIn = useCallback(
      async ({ email, password }: SignInProps) => {
         try {
            await userApi.createSession({ email, password }).then((response) => {
               const { token } = response.token

               localStorage.setItem(`${process.env.NEXT_PUBLIC_COOKIES}`, token)

               setCookie(undefined, `${process.env.NEXT_PUBLIC_COOKIES}`, token, {
                  maxAge: 7 * 24 * 60 * 60, // 7 dias
                  path: '/',
               })

               api.defaults.headers['Authorization'] = `Bearer ${token}`

               dispatch({ type: 'USER', payload: { user: response.user } })

               router.push('/')
            })
         } catch (error) {
            console.error(error)
         }
      },
      [dispatch, router]
   )

   const valueProvider = { user: state.user, signOut, signIn }

   return <AuthContext.Provider value={valueProvider}>{children}</AuthContext.Provider>
}
