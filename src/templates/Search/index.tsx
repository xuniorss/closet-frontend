'use client'

import { Products } from '@/models/products'
import { productsApi } from '@/services/apis'
import { Box, Text } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { useQuery } from 'react-query'
import { IoAlertCircle } from 'react-icons/io5'
import { ProductsList } from '../../components/ProductsList'
import { useSmallScreen } from '@/hooks/useSmallScreen'

export default function SearchTemplate() {
   const searchParams = useSearchParams()
   const search = searchParams?.get('q') as string
   const smallScreen = useSmallScreen()

   const { data } = useQuery<Products[]>({
      queryKey: `${process.env.NEXT_PUBLIC_ALL_PRODUCTS}.${search}`,
      queryFn: () => productsApi.search(search),
      cacheTime: 60000,
      staleTime: 30000,
   })

   return (
      <Box display="flex" flexDir="column" minH="60vh">
         <Box mt="2.5rem">
            <Text fontSize="xl">{`Resultados da busca por: '${search}'`}</Text>

            {data && data.length <= 0 && (
               <Box
                  mt={5}
                  bgColor="#e9e9e9"
                  p={4}
                  display="flex"
                  flexDir="row"
                  gap={3}
                  alignItems="center"
               >
                  <IoAlertCircle size={25} />
                  <Text>Não encontramos produtos correspondentes à seleção.</Text>
               </Box>
            )}

            {data && (
               <Box
                  display="flex"
                  flexDir={smallScreen ? 'column' : 'row'}
                  alignItems="center"
                  gap={4}
                  flexWrap="wrap"
                  mt={5}
               >
                  <ProductsList products={data} />
               </Box>
            )}
         </Box>
      </Box>
   )
}
