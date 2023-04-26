'use client'

import { useProtectRoute } from '@/hooks/useProtectRoute'
import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { NewModel } from './components/NewCategory'
import { ProductForm } from './components/ProductForm'

export default function RestrictAreaTemplate() {
   useProtectRoute()

   const { isOpen, onOpen, onClose } = useDisclosure()

   return (
      <Flex flexDir="column" mt="28">
         <Box display="flex" flexDir="column" pos="relative">
            <Box>
               <Button
                  bgColor="blue.300"
                  _hover={{ bgColor: 'blue.400' }}
                  color="white"
                  leftIcon={<FiPlus size={25} />}
                  onClick={onOpen}
                  type="button"
               >
                  Novo Modelo
               </Button>
            </Box>

            <ProductForm />

            <NewModel isOpen={isOpen} onClose={onClose} />
         </Box>
      </Flex>
   )
}
