'use client'

import { ReactNode } from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '@/contexts/AuthContext'

export const Providers = ({ children }: { children: ReactNode }) => {
   return (
      <CacheProvider>
         <AuthProvider>
            <ChakraProvider>{children}</ChakraProvider>
         </AuthProvider>
      </CacheProvider>
   )
}
