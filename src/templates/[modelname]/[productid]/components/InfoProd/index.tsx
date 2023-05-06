import { useAuth } from '@/hooks/useAuth'
import { useProductsContext } from '@/hooks/useProductsContext'
import { useSmallScreen } from '@/hooks/useSmallScreen'
import {
   ProductImageProps,
   Products,
   ProductSizesProps,
   ProductsSpecificationProps,
} from '@/models/products'
import {
   Badge,
   Box,
   Button,
   Divider,
   Heading,
   Input,
   Tag,
   Text,
   useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { BsHeart } from 'react-icons/bs'

import { OthersValues } from './components/modals/OthersValues'
import { RemoveProducts } from './components/modals/RemoveProducts'
import { SaledProducts } from './components/modals/SaledProducts'

type InfoProdProps = {
   product: Products
   productImage: ProductImageProps[]
   productSize: ProductSizesProps[]
   productSpec: ProductsSpecificationProps
}

export const InfoProd = ({ product, productImage, productSize, productSpec }: InfoProdProps) => {
   const [enableEditing, setEnableEditing] = useState(false)
   const { wishlist, wished } = useProductsContext()

   const { authAdmin } = useAuth()
   const smallScreen = useSmallScreen()

   const { isOpen: isOpenRemove, onOpen: onOpenRemove, onClose: onCloseRemove } = useDisclosure()
   const { isOpen: isOpenCalc, onOpen: onOpenCalc, onClose: onCloseCalc } = useDisclosure()
   const { isOpen: isOpenSaled, onOpen: onOpenSaled, onClose: onCloseSaled } = useDisclosure()

   const mediaId = productImage.find((value) => value.product_id === product.id)?.media_id as string

   return (
      <>
         <Box display="flex" flexDir="column" as={enableEditing ? 'form' : 'div'} gap={5}>
            {enableEditing && <Tag colorScheme="yellow">Modo de edição ativado</Tag>}
            <Box display="flex" flexDir="row" alignItems="center" justifyContent="space-between">
               <Box display="flex" flexDir="column">
                  <Heading textAlign="start" textTransform="capitalize" color="title.500">
                     {enableEditing && (
                        <Input defaultValue={product.product_name} borderColor="blue" />
                     )}
                     {!enableEditing && product.product_name}
                  </Heading>
                  <Text mt={2}>
                     Vendido por <span style={{ fontWeight: 'bold' }}>Closet</span>
                  </Text>
               </Box>
            </Box>
            <Box display="flex" flexDir="column" gap={3}>
               <Divider orientation="horizontal" bgColor="gray.500" />

               <Box display="flex" flexDir="row" alignItems="center" justifyContent="space-between">
                  <Text>
                     Peça{' '}
                     <span
                        style={{
                           color: product.quantity <= 0 ? 'red' : 'green',
                           fontWeight: 'bolder',
                        }}
                     >
                        {product.quantity <= 0 ? 'indisponível' : 'em estoque'}
                     </span>
                  </Text>

                  {!enableEditing && (
                     <Badge
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        cursor="pointer"
                        borderRadius="full"
                        bgColor={
                           wished && wished.find((wi) => wi.id === product.id)
                              ? '#ff6464cf'
                              : 'transparent'
                        }
                        h="45px"
                        w="45px"
                        _hover={{ bgColor: '#ff6464cf' }}
                        onClick={() => wishlist(product, productImage)}
                     >
                        {
                           <BsHeart
                              size={25}
                              color={
                                 wished && wished.find((wi) => wi.id === product.id)
                                    ? 'red'
                                    : 'black'
                              }
                           />
                        }
                     </Badge>
                  )}
               </Box>
               {authAdmin && (
                  <>
                     <Text fontSize="1.875rem" lineHeight="2.813rem" color="title.500">
                        R$ {product.price.replace('.', ',')}
                     </Text>
                  </>
               )}

               {productSpec && productSpec.color !== '#000001' && (
                  <>
                     <Text color="gray.550">Cor</Text>

                     <Box
                        borderRadius="lg"
                        w="50px"
                        h="50px"
                        bgColor={productSpec.color}
                        border="2px solid black"
                     />
                  </>
               )}

               <Text fontWeight="bold">Tamanho</Text>

               <Box display="flex" flexDir="row" gap={4}>
                  {productSize.map((size) => (
                     <Box
                        key={size.id}
                        bgColor="#f1f1f1"
                        w="50px"
                        h="50px"
                        borderRadius="lg"
                        border="2px solid black"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="xl"
                        flexDir="row"
                        fontWeight="normal"
                        gap={4}
                     >
                        <Text>{size.size}</Text>
                     </Box>
                  ))}
               </Box>

               {authAdmin && (
                  <Box display="flex" flexDir="row" alignItems="center" gap={4}>
                     <Text fontWeight="bold">Estoque</Text>
                     {!enableEditing && product.quantity}
                     {enableEditing && <Input defaultValue={product.quantity} borderColor="blue" />}
                  </Box>
               )}
            </Box>

            {authAdmin && (
               <Box display="flex" flexDir="column" border="2px dashed red">
                  <Box
                     display="flex"
                     flexDir="row"
                     justifyContent="space-between"
                     alignItems="center"
                  >
                     <Text fontSize="lg" fontWeight="semibold" ml={4}>
                        {smallScreen ? 'Ações' : 'Ações administrativas'}
                     </Text>

                     <Box
                        mr={4}
                        mt={2}
                        display="flex"
                        flexDir="row"
                        alignItems="center"
                        justifyContent="center"
                     >
                        <Tag cursor="pointer" role="button" onClick={onOpenSaled}>
                           {smallScreen ? 'Vendida ?' : 'Peça vendida ?'}
                        </Tag>
                     </Box>
                  </Box>

                  <Box
                     p={4}
                     display={smallScreen ? 'flex' : 'grid'}
                     gap={4}
                     gridTemplateColumns={!smallScreen ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'}
                  >
                     {!enableEditing && (
                        <Button colorScheme="red" onClick={onOpenRemove}>
                           {smallScreen && 'Apagar'}
                           {!smallScreen && 'Remover mercadoria'}
                        </Button>
                     )}
                     <Button
                        colorScheme="blue"
                        isDisabled
                        onClick={() => setEnableEditing(!enableEditing)}
                     >
                        {enableEditing ? 'Cancelar' : 'Editar'}
                     </Button>
                     {!enableEditing && (
                        <Button colorScheme="orange" isDisabled>
                           {smallScreen && 'Oferta'}
                           {!smallScreen && 'Ativar oferta'}
                        </Button>
                     )}
                     {!enableEditing && (
                        <Button colorScheme="purple" onClick={onOpenCalc}>
                           {smallScreen && 'Cálculo'}
                           {!smallScreen && 'Cálculo do valor'}
                        </Button>
                     )}
                  </Box>
               </Box>
            )}
         </Box>
         <RemoveProducts
            productid={product.id}
            mediaId={mediaId}
            isOpenRemove={isOpenRemove}
            onCloseRemove={onCloseRemove}
         />

         <SaledProducts
            isOpenSaled={isOpenSaled}
            onCloseSaled={onCloseSaled}
            productid={product.id}
         />

         <OthersValues price={product.price} isOpenCalc={isOpenCalc} onCloseCalc={onCloseCalc} />
      </>
   )
}
