'use client'

import { Box, Heading } from '@chakra-ui/react'
import { FormComponent } from './components/Form'

export default function SignInTemplate() {
   return (
      <Box display="flex" flexDir="column" textAlign="center" alignItems="center" mt="8.438rem">
         <Heading color="#D4BF90" fontWeight="semibold">
            Informe seus dados e tenha acesso a área restrita.
         </Heading>

         <FormComponent />
      </Box>
   )
}
