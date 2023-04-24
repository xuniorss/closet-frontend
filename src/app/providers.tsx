'use client'

import { ReactNode } from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '@/contexts/AuthContext'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/services/queryClient'
import { ReactQueryDevtools } from 'react-query/devtools'

export const Providers = ({ children }: { children: ReactNode }) => {
   return (
      <CacheProvider>
         <QueryClientProvider client={queryClient}>
            <AuthProvider>
               <ChakraProvider>{children}</ChakraProvider>
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
         </QueryClientProvider>
      </CacheProvider>
   )
}
