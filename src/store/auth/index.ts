import { UserProps } from '@/models/user'
import { api } from '@/services/apiClient'
import { userApi } from '@/services/apis'
import { SignInProps } from '@/templates/SignIn/validators'
import { destroyCookie, setCookie } from 'nookies'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { useProductsStore } from '../products'

type StateProps = {
   user: UserProps | null
   isAuthenticated: boolean
   authAdmin: boolean
}

type ActionsProps = {
   signOut: () => void
   signIn: (credentials: SignInProps) => Promise<void>
}

export const useAuthStore = create<StateProps & ActionsProps>()(
   devtools(
      persist(
         (set) => ({
            user: null,
            isAuthenticated: false,
            authAdmin: false,

            signOut: () => {
               try {
                  destroyCookie(undefined, `${process.env.NEXT_PUBLIC_COOKIES}`)
                  localStorage.removeItem(`${process.env.NEXT_PUBLIC_COOKIES}`)

                  set({ user: null, authAdmin: false, isAuthenticated: false })
               } catch (error) {
                  console.error(error)
               }
            },
            signIn: async ({ email, password }: SignInProps) => {
               try {
                  await userApi.createSession({ email, password }).then((response) => {
                     const { token } = response.token

                     localStorage.setItem(`${process.env.NEXT_PUBLIC_COOKIES}`, token)

                     setCookie(undefined, `${process.env.NEXT_PUBLIC_COOKIES}`, token, {
                        maxAge: 7 * 24 * 60 * 60, // 7 dias
                        path: '/',
                        sameSite: 'none',
                        secure: true,
                     })

                     api.defaults.headers['Authorization'] = `Bearer ${token}`

                     set({
                        user: response.user,
                        isAuthenticated: !!response.user,
                        authAdmin: !!response.user.is_adm,
                     })
                  })
               } catch (error) {
                  console.error(error)
               }
            },
         }),
         { name: 'authStore' }
      )
   )
)
