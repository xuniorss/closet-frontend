'use client'

import { useProductsContext } from '@/hooks/useProductsContext'
import { useSmallScreen } from '@/hooks/useSmallScreen'
import { Box, Image, Link, Skeleton, Text } from '@chakra-ui/react'
import { ButtonAddWishlist } from '../components/ButtonAddWishlist'
import removeAccents from 'remove-accents'
import { useProductsStore } from '@/store/products'
import { useStore } from '@/components/useStore'

export default function WishlistTemplate() {
   // const { wished } = useProductsContext()
   // const { wished } = useProductsStore()

   const store = useStore(useProductsStore, (state) => state)

   const smallScreen = useSmallScreen()

   return (
      <Box display="flex" flexDir="column" minH="calc(100vh - 15rem)">
         <Box mt="3.5rem">
            <Text
               textAlign="start"
               mb="1.5rem"
               fontSize="1.5rem"
               lineHeight="2.25rem"
               fontWeight="semibold"
               textTransform="uppercase"
            >
               Sua lista de desejos
            </Text>

            <Box mt={5} display="flex" flexDir="column" gap={4}>
               {store && store.wished.length <= 0 && (
                  <Text fontSize="xl">Lista de desejos encontra-se vazia 😥</Text>
               )}

               {store &&
                  store.wished.map((value) => {
                     const srcImage = value.productImage.find(
                        (image) => image.product_id === value.id
                     )

                     return (
                        <Box
                           key={value.id}
                           bgColor="#f1f1f1"
                           w="100%"
                           h="12.5rem"
                           borderRadius={5}
                           p={4}
                           display="flex"
                           flexDir="row"
                           alignItems="center"
                           justifyContent="space-between"
                           gap={4}
                           boxShadow="1px 1px #cfcfcf"
                        >
                           <Box display="flex" flexDir="row" h="inherit" w="inherit" gap={3}>
                              {srcImage && (
                                 <Box
                                    w={smallScreen ? '8rem' : '10rem'}
                                    h="inherit"
                                    bgColor="transparent"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                 >
                                    <Image
                                       alt="product-image"
                                       h="100%"
                                       objectFit="cover"
                                       src={srcImage.image_url}
                                    />
                                 </Box>
                              )}

                              {!srcImage && (
                                 <Skeleton w={smallScreen ? '8rem' : '10rem'} h="inherit" />
                              )}

                              <Box display="flex" flexDir="column">
                                 <Link
                                    fontSize={smallScreen ? 'md' : '2xl'}
                                    textTransform="capitalize"
                                    fontWeight="semibold"
                                    href={`/${removeAccents(value.product_name)
                                       .replace(/\s+/g, '-')
                                       .toLowerCase()}/${value.id}`}
                                 >
                                    {value.product_name}
                                 </Link>

                                 <Text textTransform="capitalize">{value.description}</Text>
                              </Box>
                           </Box>

                           <Box>
                              <ButtonAddWishlist
                                 product={value}
                                 productImage={value.productImage}
                              />
                           </Box>
                        </Box>
                     )
                  })}
            </Box>
         </Box>
      </Box>
   )
}
