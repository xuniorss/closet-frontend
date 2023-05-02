'use client'

import { useSmallScreen } from '@/hooks/useSmallScreen'
import { Products, ProductsByIdProps } from '@/models/products'
import { Box, Text } from '@chakra-ui/react'
import { Description } from './components/Accordions/Description'
import { ProductSpec } from './components/Accordions/ProductSpec'
import { ButtonKnowMore } from './components/ButtonKnowMore'
import { Carousel } from './components/Carrousel'
import { InfoProd } from './components/InfoProd'
import { ProdNoRelated } from './components/ProdNoRelated'
import { ProdRelated } from './components/ProdRelated'

type ProductsRequest = {
   products: ProductsByIdProps
   prodRelated: Products[]
   prodNoRelated: Products[]
}

export default function ProductDetailsTemplate({
   products,
   prodRelated,
   prodNoRelated,
}: ProductsRequest) {
   const smallScreen = useSmallScreen()

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
               <InfoProd
                  product={products.product}
                  productSize={products.productSize}
                  productSpec={products.productSpec}
               />

               <ButtonKnowMore product={products.product} />
            </Box>
         </Box>
         <Box mt={10}>
            <Description product={products.product} />
            <ProductSpec productSpec={products.productSpec} />
         </Box>

         <ProdRelated prodRelated={prodRelated} />
         <ProdNoRelated prodNoRelated={prodNoRelated} />
      </Box>
   )
}
