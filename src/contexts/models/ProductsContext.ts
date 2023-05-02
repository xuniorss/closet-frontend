import { ReactNode } from 'react'

export type ProductsContextData = {
   filesSteate: (files: File[]) => void
   files: File[]
}

export type ProductsProviderProps = { children: ReactNode }
