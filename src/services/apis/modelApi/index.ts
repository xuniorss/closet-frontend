import { ModelPropsResponse, ModelsPropsList } from '@/models/modelApi'
import { api } from '@/services/apiClient'
import { ModelProps } from '@/templates/Restrict/components/NewCategory/validator'

const createModel = async ({ modelname, description }: ModelProps): Promise<ModelPropsResponse> => {
   const { data } = await api.post<ModelPropsResponse>('/create-model', { modelname, description })
   return data
}

const models = async (): Promise<ModelsPropsList[]> => {
   const { data } = await api.get<ModelsPropsList[]>('/models')
   return data
}

export const modelApi = { createModel, models }
