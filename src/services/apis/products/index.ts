import { Products } from '@/models/products'
import { api } from '@/services/apiClient'
import { ProductsProps } from '@/templates/Restrict/components/NewCategory/validator'

const create = async ({
   product_name,
   model_id,
   size,
   price,
   quantity,
   description,
   image_url,
}: ProductsProps): Promise<void> => {
   const { data } = await api.post<void>(`/create-product`, {
      product_name,
      model_id,
      size,
      price,
      quantity,
      description,
      image_url,
   })
   return data
}

const list = async (): Promise<Products[]> => {
   const { data } = await api.get<Products[]>('/products')
   return data
}

export const productsApi = { create, list }
