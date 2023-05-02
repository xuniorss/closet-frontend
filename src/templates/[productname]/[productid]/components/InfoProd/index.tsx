import { useAuth } from '@/hooks/useAuth'
import { Products, ProductSizesProps, ProductsSpecificationProps } from '@/models/products'
import { Box, Divider, Heading, Tag, Text } from '@chakra-ui/react'
import { BsHeart } from 'react-icons/bs'

type InfoProdProps = {
   product: Products
   productSize: ProductSizesProps[]
   productSpec: ProductsSpecificationProps
}

export const InfoProd = ({ product, productSize, productSpec }: InfoProdProps) => {
   const { authAdmin } = useAuth()

   return (
      <Box display="flex" flexDir="column" gap={5}>
         <Box display="flex" flexDir="row" alignItems="center" justifyContent="space-between">
            <Box display="flex" flexDir="column">
               <Heading textAlign="start" color="#261E1E">
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
               _hover={{ bgColor: '#f1f1f1' }}
            >
               {<BsHeart size={25} color="#949494" />}
            </Tag>
         </Box>
         <Box display="flex" flexDir="column" gap={3}>
            <Divider orientation="horizontal" bgColor="#DDD" />

            {product.quantity > 0 && (
               <Text>
                  Peça em <span style={{ color: 'green', fontWeight: 'bolder' }}>estoque</span>
               </Text>
            )}
            {authAdmin && (
               <>
                  <Text fontSize="1.875rem" lineHeight="2.813rem" color="#261E1E">
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
                  <Text color="#b9b9b9">Cor</Text>

                  <Box w="50px" h="50px" bgColor={productSpec.color} />
               </>
            )}
         </Box>
      </Box>
   )
}
