'use client'

import { Container } from '@chakra-ui/react'
import { ReactNode } from 'react'

export const ContainerComponent = ({ children }: { children: ReactNode }) => {
   return (
      <Container maxW={{ base: '100%', lg: '78.125rem' }} mt="5rem">
         {children}
      </Container>
   )
}
