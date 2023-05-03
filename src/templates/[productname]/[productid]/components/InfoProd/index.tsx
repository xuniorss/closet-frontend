import { useAuth } from '@/hooks/useAuth'
import { useSmallScreen } from '@/hooks/useSmallScreen'
import {
   ProductImageProps,
   Products,
   ProductSizesProps,
   ProductsSpecificationProps,
} from '@/models/products'
import { Box, Button, Divider, Heading, Input, Tag, Text, useDisclosure } from '@chakra-ui/react'
import { BsHeart } from 'react-icons/bs'
import { RemoveProducts } from './components/modals/RemoveProducts'
import { useCallback, useState } from 'react'
import { OthersValues } from './components/modals/OthersValues'

type InfoProdProps = {
   product: Products
   productImage: ProductImageProps[]
   productSize: ProductSizesProps[]
   productSpec: ProductsSpecificationProps
}

export const InfoProd = ({ product, productImage, productSize, productSpec }: InfoProdProps) => {
   const [enableEditing, setEnableEditing] = useState(false)

   const { authAdmin } = useAuth()
   const smallScreen = useSmallScreen()

   const { isOpen: isOpenRemove, onOpen: onOpenRemove, onClose: onCloseRemove } = useDisclosure()
   const { isOpen: isOpenCalc, onOpen: onOpenCalc, onClose: onCloseCalc } = useDisclosure()

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
                  {product.quantity > 0 && (
                     <Text>
                        Peça em{' '}
                        <span style={{ color: 'green', fontWeight: 'bolder' }}>estoque</span>
                     </Text>
                  )}

                  {!enableEditing && (
                     <Tag
                        display="flex"
                        alignItems="center"
                        cursor="pointer"
                        borderRadius="full"
                        bgColor="transparent"
                        _hover={{ bgColor: 'white.550' }}
                     >
                        {<BsHeart size={25} color="gray.700" />}
                     </Tag>
                  )}
               </Box>
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

               {authAdmin && (
                  <Box display="flex" flexDir="row" alignItems="center" gap={4}>
                     <Text fontWeight="bold">Estoque</Text>
                     {!enableEditing && product.quantity}
                     {enableEditing && <Input defaultValue={product.quantity} borderColor="blue" />}
                  </Box>
               )}

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

         <OthersValues price={product.price} isOpenCalc={isOpenCalc} onCloseCalc={onCloseCalc} />
      </>
   )
}
