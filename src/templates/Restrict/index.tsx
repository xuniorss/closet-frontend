'use client'

import { useProtectRoute } from '@/hooks/useProtectRoute'
import {
   Box,
   Button,
   Flex,
   FormControl,
   FormLabel,
   Image,
   Input,
   Select,
   useDisclosure,
   useMediaQuery,
} from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { NewModel } from './components/NewCategory'

type SizeProps = {
   size: string
}

const sizes: Array<SizeProps> = [{ size: 'p' }, { size: 'm' }, { size: 'g' }, { size: 'gg' }]

export default function RestrictAreaTemplate() {
   useProtectRoute()

   const { isOpen, onOpen, onClose } = useDisclosure()

   const [smallScreen] = useMediaQuery('(max-width: 1250px)')

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

            <Box display="flex" flexDir="column" mt="10">
               <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDir={smallScreen ? 'column' : 'row'}
                  gap={4}
               >
                  <Box w="100%" display="flex" flexDir="column" gap={5}>
                     <FormControl>
                        <FormLabel>Nome da mercadoria</FormLabel>
                        <Input bgColor="#F1F1F1" size="lg" />
                     </FormControl>

                     <FormControl>
                        <FormLabel>Modelo</FormLabel>
                        <Select placeholder="large size" bgColor="#F1F1F1" size="lg" />
                     </FormControl>

                     <Box display="flex" gap={5} flexDir={smallScreen ? 'column' : 'row'}>
                        <FormControl>
                           <FormLabel>Tamanho</FormLabel>
                           <Select bgColor="#F1F1F1" size="lg">
                              {sizes.map((value) => (
                                 <option
                                    style={{ backgroundColor: '#F1F1F1' }}
                                    key={value.size}
                                    value={value.size}
                                 >
                                    {value.size.toUpperCase()}
                                 </option>
                              ))}
                           </Select>
                        </FormControl>

                        <FormControl>
                           <FormLabel>Valor</FormLabel>
                           <Input bgColor="#F1F1F1" size="lg" />
                        </FormControl>
                     </Box>
                  </Box>
                  <Box>
                     <FormLabel>Preview da imagem</FormLabel>
                     <Image
                        src="https://picsum.photos/200/300"
                        objectFit="cover"
                        w="21rem"
                        h="21rem"
                        alt="image"
                     />
                  </Box>
               </Box>
               <Box pos={smallScreen ? 'absolute' : 'relative'} right={0} top={0}>
                  <Button bgColor="green.300" _hover={{ bgColor: 'green.400' }} color="white">
                     Salvar
                  </Button>
               </Box>
            </Box>

            <NewModel isOpen={isOpen} onClose={onClose} />
         </Box>
      </Flex>
   )
}
