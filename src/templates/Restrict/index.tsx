'use client'

import { useProtectRoute } from '@/hooks/useProtectRoute'
import { useSmallScreen } from '@/hooks/useSmallScreen'
import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { NewModel } from './components/NewCategory'
import { NewSize } from './components/NewSize'
import { ProductForm } from './components/ProductForm'

export default function RestrictAreaTemplate() {
   useProtectRoute()

   const smallScreen = useSmallScreen()

   const { isOpen, onOpen, onClose } = useDisclosure()
   const { isOpen: isOpenSize, onOpen: onOpenSize, onClose: onCloseSize } = useDisclosure()

   return (
      <Flex flexDir="column" mt="28">
         <Box display="flex" flexDir="column" pos="relative">
            <Box
               display="flex"
               flexDir={smallScreen ? 'column' : 'row'}
               w={smallScreen ? '50%' : '100%'}
               gap={3}
            >
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

               <Button
                  bgColor="purple.300"
                  _hover={{ bgColor: 'purple.400' }}
                  color="white"
                  leftIcon={<FiPlus size={25} />}
                  onClick={onOpenSize}
                  type="button"
               >
                  Novo Tamanho
               </Button>
            </Box>

            <ProductForm />

            <NewModel isOpen={isOpen} onClose={onClose} />
            <NewSize isOpen={isOpenSize} onClose={onCloseSize} />
         </Box>
      </Flex>
   )
}
