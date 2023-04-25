import { ModelPropsResponse } from '@/models/modelApi'
import { api } from '@/services/apiClient'
import { ModelProps } from '@/templates/Restrict/components/NewCategory/validator'

const createModel = async ({ modelname, description }: ModelProps): Promise<ModelPropsResponse> => {
   const { data } = await api.post<ModelPropsResponse>('/create-model', { modelname, description })
   return data
}

export const modelApi = { createModel }
