import { useStore } from '@/components/useStore'
import { ProductImageProps, Products, StorageProps } from '@/models/products'
import { useAuthStore } from '@/store/auth'
import { createContext, useCallback, useEffect } from 'react'

import { ProductsContextData, ProductsProviderProps } from '../models/ProductsContext'
import { useProductReduce } from './utils/reducerProduct'

export const ProductsContext = createContext({} as ProductsContextData)

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
   const [state, dispatch] = useProductReduce({ files: [], wished: [] })

   const store = useStore(useAuthStore, (state) => state)

   const key = `${process.env.NEXT_PUBLIC_WISHLIST}-${store && store.user?.id}`

   const filesSteate = useCallback(
      (files: File[]) => {
         dispatch({ type: 'FILE', payload: { files } })
      },
      [dispatch]
   )

   useEffect(() => {
      const getItemStorage = JSON.parse(localStorage.getItem(key) || '[]') as StorageProps[]

      dispatch({ type: 'WISHED', payload: { wished: getItemStorage } })

      if (!store?.isAuthenticated) {
         dispatch({ type: 'WISHED', payload: { wished: [] } })
         return
      }
   }, [dispatch, key, store?.isAuthenticated])

   // const wishlist = useCallback(
   //    (product: Products, productImage: ProductImageProps[]) => {
   //       if (!store?.isAuthenticated) return

   //       const dataToSave: StorageProps = {
   //          ...product,
   //          productImage,
   //       }

   //       const getItemStorage = JSON.parse(localStorage.getItem(key) || '[]') as StorageProps[]

   //       const verify = getItemStorage.find((value) => value.id === product.id)

   //       if (!verify) {
   //          const data = [...getItemStorage, dataToSave]
   //          localStorage.setItem(key, JSON.stringify(data))
   //          dispatch({ type: 'WISHED', payload: { wished: data } })
   //          return
   //       }

   //       const idx = getItemStorage.findIndex((value) => value.id === product.id)
   //       const removed = getItemStorage.splice(idx, 1)

   //       const id = removed.map((value) => value.id)[0]
   //       const filtered = getItemStorage.filter((value) => value.id !== id)

   //       const data = [...filtered]

   //       localStorage.setItem(key, JSON.stringify(data))
   //       dispatch({ type: 'WISHED', payload: { wished: data } })
   //    },
   //    [dispatch, store?.isAuthenticated, key]
   // )

   const valueProvider = {
      files: state.files,
      filesSteate,
   }

   return <ProductsContext.Provider value={valueProvider}>{children}</ProductsContext.Provider>
}
