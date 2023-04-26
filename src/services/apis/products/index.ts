import { api } from '@/services/apiClient'
import { ProductsProps } from '@/templates/Restrict/components/NewCategory/validator'

const create = async ({
   product_code,
   product_name,
   model_id,
   size,
   price,
   quantity,
   description,
   image_id,
   image_url,
}: ProductsProps): Promise<void> => {
   const { data } = await api.post<void>(`/create-product`, {
      product_code,
      product_name,
      model_id,
      size,
      price,
      quantity,
      description,
      image_id,
      image_url,
   })
   return data
}

export const productsApi = { create }
