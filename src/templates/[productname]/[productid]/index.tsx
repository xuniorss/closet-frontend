'use client'

import { useAuth } from '@/hooks/useAuth'
import { useSmallScreen } from '@/hooks/useSmallScreen'
import { ProductsByIdProps } from '@/models/products'
import {
   Accordion,
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel,
   Box,
   Button,
   Divider,
   Heading,
   Tag,
   Text,
} from '@chakra-ui/react'
import { useCallback } from 'react'
import { BsHeart } from 'react-icons/bs'
import { FaWhatsapp } from 'react-icons/fa'
import { Carousel } from './components/Carrousel'

type ProductsRequest = {
   products: ProductsByIdProps
}

export default function ProductDetailsTemplate({ products }: ProductsRequest) {
   const smallScreen = useSmallScreen()
   const { authAdmin } = useAuth()

   const handleWhatsApp = useCallback(() => {
      const message = `Olá, gostaria de informações sobre o produto "${products.product.product_name}"`

      const url = `${process.env.NEXT_PUBLIC_WHATSSAPP_MESSAGE_API}${encodeURIComponent(message)}`

      window.open(url)
   }, [products.product.product_name])

   return (
      <Box display="flex" flexDir="column" mt="32" mb={smallScreen ? '36' : '20'}>
         <Box
            display={smallScreen ? 'flex' : 'grid'}
            gridTemplateColumns={!smallScreen ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'}
            flexDir={smallScreen ? 'column' : 'row'}
            gap={5}
            alignItems={smallScreen ? 'center' : 'flex-start'}
         >
            <Box
               display="flex"
               flexDir="column"
               h={{ base: 'auto', lg: '45.625rem' }}
               w={{ base: 'auto', xl: '36.563rem' }}
            >
               <Carousel productImage={products.productImage} />
               <Text textAlign="center" fontSize="sm" color="#c2c2c2">
                  Clique para ampliar a imagem
               </Text>
            </Box>
            <Box
               display="flex"
               flexDir="column"
               h="100%"
               w="100%"
               justifyContent="space-between"
               pos="relative"
            >
               <Box display="flex" flexDir="column" gap={5}>
                  <Box
                     display="flex"
                     flexDir="row"
                     alignItems="center"
                     justifyContent="space-between"
                  >
                     <Box display="flex" flexDir="column">
                        <Heading textAlign="start" color="#261E1E">
                           {products.product.product_name}
                        </Heading>
                        <Text mt={2}>
                           Vendido por <span style={{ fontWeight: 'bold' }}>Closet</span>
                        </Text>
                     </Box>
                     <Tag
                        display="flex"
                        justifyContent="center"
                        cursor="pointer"
                        h="55%"
                        w="auto"
                        borderRadius="full"
                        bgColor="transparent"
                        _hover={{ bgColor: '#f1f1f1' }}
                     >
                        {<BsHeart size={25} color="#949494" />}
                     </Tag>
                  </Box>
                  <Box display="flex" flexDir="column" gap={3}>
                     <Divider orientation="horizontal" bgColor="#DDD" />

                     {products.product.quantity > 0 && (
                        <Text>
                           Peça em{' '}
                           <span style={{ color: 'green', fontWeight: 'bolder' }}>estoque</span>
                        </Text>
                     )}
                     {authAdmin && (
                        <>
                           <Text fontSize="1.875rem" lineHeight="2.813rem" color="#261E1E">
                              R$ {products.product.price.replace('.', ',')}
                           </Text>
                        </>
                     )}

                     <Text fontWeight="bold">Tamanho</Text>
                     <Box display="flex" flexDir="row" gap={4}>
                        {products.productSize.map((size) => (
                           <Text key={size.id}>{size.size}</Text>
                        ))}
                     </Box>

                     {products.productSpec && (
                        <>
                           <Text color="#b9b9b9">Cor</Text>

                           <Box w="50px" h="50px" bgColor={products.productSpec.color} />
                        </>
                     )}
                  </Box>
               </Box>
               <Box mb={5}>
                  <Button
                     w="100%"
                     height={smallScreen ? '16' : '12'}
                     _hover={{ bgColor: '#008844' }}
                     bgColor="#3BCD41"
                     color="white"
                     fontSize="larger"
                     fontWeight="bold"
                     borderRadius={smallScreen ? 'none' : 'lg'}
                     pos={smallScreen ? 'fixed' : 'relative'}
                     bottom={0}
                     right={0}
                     left={0}
                     leftIcon={<FaWhatsapp size={25} />}
                     onClick={handleWhatsApp}
                     zIndex={smallScreen ? '999' : '0'}
                  >
                     Saiba mais
                  </Button>
               </Box>
            </Box>
         </Box>
         <Box mt={10}>
            {products.product.description && (
               <Accordion allowToggle>
                  <AccordionItem>
                     <h2>
                        <AccordionButton>
                           <Box as="span" flex="1" textAlign="left" fontWeight="bold">
                              Descrição
                           </Box>
                           <AccordionIcon />
                        </AccordionButton>
                     </h2>
                     <AccordionPanel pb={4}>{products.product.description}</AccordionPanel>
                  </AccordionItem>
               </Accordion>
            )}

            {products.productSpec && (
               <Accordion allowToggle>
                  <AccordionItem>
                     <h2>
                        <AccordionButton>
                           <Box as="span" flex="1" textAlign="left" fontWeight="bold">
                              Especificações do produtos
                           </Box>
                           <AccordionIcon />
                        </AccordionButton>
                     </h2>
                     <AccordionPanel pb={4}>
                        <Text color="#949494">
                           Composição Principal:{' '}
                           <span style={{ color: 'black' }}>
                              {products.productSpec.composition}
                           </span>
                        </Text>
                        <Text color="#949494">
                           Código Genérico:{' '}
                           <span style={{ color: 'black' }}>
                              {products.productSpec.generic_code}
                           </span>
                        </Text>
                     </AccordionPanel>
                  </AccordionItem>
               </Accordion>
            )}
         </Box>
         <Box>
            <Text>Alguns outros produtos do modelo, que talvez possa te interessar</Text>
         </Box>
      </Box>
   )
}
