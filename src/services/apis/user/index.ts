import { UserProps, UserRequest } from '@/models/user'
import { api } from '@/services/apiClient'
import { SignInProps } from '@/templates/SignIn/validators'

const createSession = async ({ email, password }: SignInProps): Promise<UserRequest> => {
   const { data } = await api.post<UserRequest>('/create-session', { email, password })
   return data
}

const me = async (): Promise<UserProps> => {
   const { data } = await api.get<UserProps>('/me')
   return data
}

export const userApi = { createSession, me }
