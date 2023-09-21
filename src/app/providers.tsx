'use client'

import { ProductsProvider } from '@/contexts/ProductsContext'
import { queryClient } from '@/services/queryClient'
import { theme } from '@/theme'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

export const Providers = ({ children }: { children: ReactNode }) => {
   return (
      <CacheProvider>
         <QueryClientProvider client={queryClient}>
            <ProductsProvider>
               <ChakraProvider theme={theme}>{children}</ChakraProvider>
            </ProductsProvider>
            <ReactQueryDevtools initialIsOpen={false} />
         </QueryClientProvider>
      </CacheProvider>
   )
}
