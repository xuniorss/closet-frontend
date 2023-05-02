import { createContext, useCallback } from 'react'

import { ProductsContextData, ProductsProviderProps } from '../models/ProductsContext'
import { useFiles } from './utils/reducerFiles'

export const ProductsContext = createContext({} as ProductsContextData)

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
   const [state, dispatch] = useFiles({ files: [] })

   const filesSteate = useCallback(
      (files: File[]) => {
         dispatch({ type: 'FILE', payload: { files } })
      },
      [dispatch]
   )

   const valueProvider = {
      files: state.files,
      filesSteate,
   }

   return <ProductsContext.Provider value={valueProvider}>{children}</ProductsContext.Provider>
}
