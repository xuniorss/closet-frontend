import { Container } from '@chakra-ui/react'
import { ReactNode } from 'react'

export const ContainerForm = ({ children }: { children: ReactNode }) => {
   return (
      <Container
         display="flex"
         flexDir="column"
         alignItems="center"
         maxW={{ base: '100%', lg: '78.125rem' }}
      >
         {children}
      </Container>
   )
}
