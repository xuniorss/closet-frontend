'use client'

import { CardProducts } from '@/components/ProductsList/components/CardProducts'
import { CollectionsResponseProps } from '@/models/collections'
import { collectionApi } from '@/services/apis'
import { Box, Tag, Text } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { NewCollection } from './components/NewCollection'

export default function CollectionsTemplate() {
   const { data: collectionsList } = useQuery<CollectionsResponseProps[]>({
      queryKey: process.env.NEXT_PUBLIC_ALL_COLLECTIONS,
      queryFn: () => collectionApi.list(),
   })

   return (
      <Box display="flex" flexDir="column" minH="calc(100vh - 15rem)">
         <Box mt="3.5rem">
            <NewCollection />
            {collectionsList && collectionsList.length <= 0 && (
               <Box>
                  <Tag>Nenhuma coleção encontrada</Tag>
               </Box>
            )}
            {/* {collectionsList &&
               collectionsList.length > 0 &&
               collectionsList.map((collection) => (
                  <Box
                     key={collection.collection_id}
                     display="flex"
                     alignItems="center"
                     justifyContent="center"
                     flexDir="column"
                  >
                     <Text
                        textAlign="center"
                        mb="1.5rem"
                        fontSize="1.5rem"
                        lineHeight="2.25rem"
                        fontWeight="normal"
                     >
                        {collection.collection_name}
                     </Text>
                     <Box>
                        <CardProducts value={collection} />
                     </Box>
                  </Box>
               ))} */}
         </Box>
      </Box>
   )
}
