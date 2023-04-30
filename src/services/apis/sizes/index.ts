import { SizePropsRequest } from '@/models/sizes'
import { api } from '@/services/apiClient'
import { SizeProps } from '@/templates/Restrict/components/NewSize/validator'

const create = async ({ size, description }: SizeProps): Promise<void> => {
   const { data } = await api.post<void>('/create-size', { size, description })
   return data
}

const index = async (): Promise<SizePropsRequest[]> => {
   const { data } = await api.get<SizePropsRequest[]>('/sizes')
   return data
}

export const sizeApi = { create, index }
