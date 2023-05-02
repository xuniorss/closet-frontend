'use client'

import { AuthProvider } from '@/contexts/AuthContext'
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
            <AuthProvider>
               <ProductsProvider>
                  <ChakraProvider theme={theme}>{children}</ChakraProvider>
               </ProductsProvider>
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
         </QueryClientProvider>
      </CacheProvider>
   )
}
