import { ProductsContext } from '@/contexts/ProductsContext'
import { useContext } from 'react'

export const useProductsContext = () => {
   const products = useContext(ProductsContext)
   return products
}
