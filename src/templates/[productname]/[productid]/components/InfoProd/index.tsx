import { useAuth } from '@/hooks/useAuth'
import { useSmallScreen } from '@/hooks/useSmallScreen'
import {
   ProductImageProps,
   Products,
   ProductSizesProps,
   ProductsSpecificationProps,
} from '@/models/products'
import { Box, Button, Divider, Heading, Tag, Text, useDisclosure } from '@chakra-ui/react'
import { BsHeart } from 'react-icons/bs'
import { RemoveProducts } from './components/modals/RemoveProducts'

type InfoProdProps = {
   product: Products
   productImage: ProductImageProps[]
   productSize: ProductSizesProps[]
   productSpec: ProductsSpecificationProps
}

export const InfoProd = ({ product, productImage, productSize, productSpec }: InfoProdProps) => {
   const { authAdmin } = useAuth()
   const smallScreen = useSmallScreen()

   const { isOpen: isOpenRemove, onOpen: onOpenRemove, onClose: onCloseRemove } = useDisclosure()

   const mediaId = productImage.find((value) => value.product_id === product.id)?.media_id as string

   return (
      <Box display="flex" flexDir="column" gap={5}>
         <Box display="flex" flexDir="row" alignItems="center" justifyContent="space-between">
            <Box display="flex" flexDir="column">
               <Heading textAlign="start" textTransform="capitalize" color="title.500">
                  {product.product_name}
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
               _hover={{ bgColor: 'white.550' }}
            >
               {<BsHeart size={25} color="gray.700" />}
            </Tag>
         </Box>
         <Box display="flex" flexDir="column" gap={3}>
            <Divider orientation="horizontal" bgColor="gray.500" />

            {product.quantity > 0 && (
               <Text>
                  Peça em <span style={{ color: 'green', fontWeight: 'bolder' }}>estoque</span>
               </Text>
            )}
            {authAdmin && (
               <>
                  <Text fontSize="1.875rem" lineHeight="2.813rem" color="title.500">
                     R$ {product.price.replace('.', ',')}
                  </Text>
               </>
            )}

            <Text fontWeight="bold">Tamanho</Text>
            <Box display="flex" flexDir="row" gap={4}>
               {productSize.map((size) => (
                  <Text key={size.id}>{size.size}</Text>
               ))}
            </Box>

            {productSpec && productSpec.color !== '#000001' && (
               <>
                  <Text color="gray.550">Cor</Text>

                  <Box w="50px" h="50px" bgColor={productSpec.color} />
               </>
            )}
         </Box>

         {authAdmin && (
            <Box display="flex" flexDir="column" border="2px dashed red">
               <Text fontSize="lg" fontWeight="semibold" ml={4}>
                  Ações administrativas
               </Text>

               <Box p={4} display="flex" flexDir="row" justifyContent="space-between">
                  <Button colorScheme="red" onClick={onOpenRemove}>
                     {smallScreen && 'Remover'}
                     {!smallScreen && 'Remover mercadoria'}
                  </Button>
                  <Button colorScheme="blue">Editar</Button>
                  <Button colorScheme="orange">
                     {smallScreen && 'Oferta'}
                     {!smallScreen && 'Ativar oferta'}
                  </Button>
               </Box>
            </Box>
         )}

         <RemoveProducts
            productid={product.id}
            mediaId={mediaId}
            isOpenRemove={isOpenRemove}
            onCloseRemove={onCloseRemove}
         />
      </Box>
   )
}
