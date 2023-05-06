import { CollectionsResponseProps } from '@/models/collections'
import { api } from '@/services/apiClient'
import { CollectionProps } from '@/templates/Collections/validators'

const create = async ({
   name,
   modelId,
   numItems,
   showHome,
   finalDate,
}: CollectionProps): Promise<void> => {
   await api.post<void>('/create-collection', { name, modelId, numItems, showHome, finalDate })
}

const list = async (): Promise<CollectionsResponseProps[]> => {
   const { data } = await api.get<CollectionsResponseProps[]>('/collections')
   return data
}

export const collectionApi = { create, list }
