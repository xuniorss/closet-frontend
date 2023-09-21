import { useStore } from '@/components/useStore'
import { StorageProps } from '@/models/products'
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

   const valueProvider = {
      files: state.files,
      filesSteate,
   }

   return <ProductsContext.Provider value={valueProvider}>{children}</ProductsContext.Provider>
}
