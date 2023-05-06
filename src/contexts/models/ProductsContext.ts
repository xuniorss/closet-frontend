import { ProductImageProps, Products, StorageProps } from '@/models/products'
import { ReactNode } from 'react'

export type ProductsContextData = {
   filesSteate: (files: File[]) => void
   files: File[]
   wishlist: (product: Products, productImage: ProductImageProps[]) => void
   wished: StorageProps[]
}

export type ProductsProviderProps = { children: ReactNode }
