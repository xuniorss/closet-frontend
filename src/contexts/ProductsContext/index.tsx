import { useAuth } from '@/hooks/useAuth'
import { ProductImageProps, Products, StorageProps } from '@/models/products'
import { createContext, useCallback, useEffect } from 'react'

import { ProductsContextData, ProductsProviderProps } from '../models/ProductsContext'
import { useProductReduce } from './utils/reducerProduct'

export const ProductsContext = createContext({} as ProductsContextData)

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
   const [state, dispatch] = useProductReduce({ files: [], wished: [] })

   const { isAuthenticated } = useAuth()

   const filesSteate = useCallback(
      (files: File[]) => {
         dispatch({ type: 'FILE', payload: { files } })
      },
      [dispatch]
   )

   useEffect(() => {
      const getItemStorage = JSON.parse(
         localStorage.getItem(`${process.env.NEXT_PUBLIC_WISHLIST}`) || '[]'
      ) as StorageProps[]

      dispatch({ type: 'WISHED', payload: { wished: getItemStorage } })
   }, [dispatch])

   const wishlist = useCallback(
      (product: Products, productImage: ProductImageProps[]) => {
         if (!isAuthenticated) return

         const dataToSave: StorageProps = {
            ...product,
            productImage,
         }

         const getItemStorage = JSON.parse(
            localStorage.getItem(`${process.env.NEXT_PUBLIC_WISHLIST}`) || '[]'
         ) as StorageProps[]

         const verify = getItemStorage.find((value) => value.id === product.id)

         if (!verify) {
            const data = [...getItemStorage, dataToSave]
            localStorage.setItem(`${process.env.NEXT_PUBLIC_WISHLIST}`, JSON.stringify(data))
            dispatch({ type: 'WISHED', payload: { wished: data } })
            return
         }

         const idx = getItemStorage.findIndex((value) => value.id === product.id)
         const removed = getItemStorage.splice(idx, 1)

         const id = removed.map((value) => value.id)[0]
         const filtered = getItemStorage.filter((value) => value.id !== id)

         const data = [...filtered]

         localStorage.setItem(`${process.env.NEXT_PUBLIC_WISHLIST}`, JSON.stringify(data))
         dispatch({ type: 'WISHED', payload: { wished: data } })
      },
      [dispatch, isAuthenticated]
   )

   const valueProvider = {
      files: state.files,
      filesSteate,
      wishlist,
      wished: state.wished,
   }

   return <ProductsContext.Provider value={valueProvider}>{children}</ProductsContext.Provider>
}
