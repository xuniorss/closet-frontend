'use client'

import { Box, HStack, Spinner, Text } from '@chakra-ui/react'
import { InputSearch } from './components/InputSearch'
import { ProductsList } from './components/ProductsList'
import { useCatalog } from './hooks/useCatalog'

export default function CatalogTemplate() {
   const {
      search,
      searchState,
      handleClearInput,
      filtered,
      defferedSearch,
      mobile,
      isLoading,
      products,
      dataProducts,
   } = useCatalog()

   return (
      <Box display="flex" flexDir="column">
         <Box
            borderRadius="5px"
            mt="2.5rem"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            zIndex="999"
         >
            <InputSearch
               searchState={searchState}
               search={search}
               handleClearInput={handleClearInput}
            />
         </Box>
         <Box
            overflowY="scroll"
            maxH="80vh"
            display="flex"
            flexDir="column"
            css={{
               '&::-webkit-scrollbar': {
                  width: '6px',
               },
               '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'transparent',
               },
            }}
         >
            {filtered.length <= 0 && defferedSearch.length > 3 && (
               <Box display="flex" alignItems="center" justifyContent="center">
                  <Text color="red.500">Nenhum produto encontrado.</Text>
               </Box>
            )}
            <Box
               ml="70px"
               mr="70px"
               mt="2rem"
               display="flex"
               flexDir={mobile ? 'column' : 'row'}
               flexWrap="wrap"
               justifyContent={(dataProducts && 'space-between') || 'center'}
               alignItems="center"
            >
               {isLoading && (
                  <HStack>
                     <Spinner size="lg" color="#D4BF90" />
                     <Text>Buscando por novos produtos. 😍</Text>
                  </HStack>
               )}

               {products && !isLoading && <ProductsList products={products} />}

               {!dataProducts && !isLoading && <Text>Nada por aqui. 🤔</Text>}
            </Box>
         </Box>
      </Box>
   )
}
