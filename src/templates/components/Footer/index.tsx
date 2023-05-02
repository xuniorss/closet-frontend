'use client'

import { useSmallScreen } from '@/hooks/useSmallScreen'
import { Box } from '@chakra-ui/react'
import { ContainerForm } from './components/ContainerForm'
import { Copyright } from './components/Copyright'
import { FormNews } from './components/FormNews'
import { Infos } from './components/Infos'

export const Footer = () => {
   const smallScreen = useSmallScreen()

   return (
      <Box
         minH="auto"
         borderTop="5px solid #F6f6f6"
         bgColor="white"
         display="flex"
         flexDir="column"
         mt={8}
         mb={smallScreen ? '16' : '8'}
      >
         <Box p={5}>
            <ContainerForm>
               <Box w="inherit" gap={3} display="flex" flexDir="column" alignItems="center">
                  <FormNews />
               </Box>
            </ContainerForm>
            <Box bgColor="white.500" w="100%" p={4} mt={5}>
               <ContainerForm>
                  <Infos />
               </ContainerForm>
            </Box>
            <Box w="100%">
               <ContainerForm>
                  <Copyright />
               </ContainerForm>
            </Box>
         </Box>
      </Box>
   )
}
