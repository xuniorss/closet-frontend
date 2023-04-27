'use client'

import { Products } from '@/models/products'
import { productsApi } from '@/services/apis'
import {
   Box,
   HStack,
   Image,
   Input,
   InputGroup,
   InputRightElement,
   Spinner,
   Text,
   useMediaQuery,
} from '@chakra-ui/react'
import { useCallback, useDeferredValue, useEffect, useState, useTransition } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useQuery } from 'react-query'
import { CgClose } from 'react-icons/cg'
import removeAccents from 'remove-accents'

export default function CatalogTemplate() {
   const [search, setSearch] = useState('')
   const defferedSearch = useDeferredValue(search)
   const [isPending, startTransition] = useTransition()
   const [mobile] = useMediaQuery('(max-width: 740px)')

   const { data: dataProducts, isLoading } = useQuery<Products[]>({
      queryKey: process.env.NEXT_PUBLIC_ALL_PRODUCTS,
      queryFn: () => productsApi.list(),
      cacheTime: 60000, // Mantém a consulta em cache por 1 minuto
      staleTime: 30000, // Considera os dados em cache como "stale" após 30 segundos
   })

   const [filtered, setFiltered] = useState<Products[]>((dataProducts && dataProducts) || [])

   const [products, setProducts] = useState<Products[]>([])

   const handleClearInput = useCallback(() => {
      setFiltered([])
      setProducts((dataProducts && dataProducts) || [])
      setSearch('')
   }, [dataProducts])

   useEffect(() => {
      if (defferedSearch.length <= 3 || !dataProducts) {
         setFiltered([])
         return
      }

      const filtered = dataProducts.filter((value) =>
         value.product_name
            .toLowerCase()
            .includes(removeAccents.remove(defferedSearch.toLowerCase()))
      )

      setFiltered(filtered)
   }, [defferedSearch, dataProducts])

   useEffect(() => {
      if (!dataProducts) return

      if (filtered.length > 0) return setProducts(filtered)

      setProducts(dataProducts)
   }, [dataProducts, filtered])

   return (
      <Box display="flex" flexDir="column">
         <Box
            borderRadius="5px"
            mt="2.5rem"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            zIndex="999"
         >
            <InputGroup>
               <Input
                  bgColor="#f5f5f5"
                  h="3.75rem"
                  fontSize="lg"
                  onChange={(e) => startTransition(() => setSearch(e.target.value))}
                  value={search}
                  placeholder="Informe mais de 3 caracteres para efetuar a pesquisa..."
                  _placeholder={{ color: '#cecece' }}
               />
               <InputRightElement h="100%">
                  {search.length > 0 && (
                     <CgClose onClick={handleClearInput} size={20} cursor="pointer" />
                  )}
                  {search.length <= 0 && <FiSearch size={20} />}
               </InputRightElement>
            </InputGroup>
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
            {isPending && defferedSearch.length > 3 && (
               <Box display="flex" alignItems="center" justifyContent="center">
                  <Spinner size="lg" color="#D4BF90" />
               </Box>
            )}

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

               {products &&
                  !isLoading &&
                  products.map((value) => (
                     <Box
                        key={value.id}
                        w="17.188rem"
                        minH="27.5rem"
                        borderRadius="5px"
                        _hover={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                        cursor="pointer"
                        mb="1rem"
                        as="form"
                     >
                        <Box bgColor="#DDD" borderTopLeftRadius="5px" borderTopRightRadius="5px">
                           <Image
                              src={value.image_url}
                              alt="image-prod"
                              objectFit="cover"
                              w="275px"
                              h="335px"
                              borderTopLeftRadius="inherit"
                              borderTopRightRadius="inherit"
                           />
                        </Box>
                        <Box p="1">
                           <Text
                              fontSize="16px"
                              lineHeight="24px"
                              color="#464646"
                              textAlign="start"
                              fontWeight="normal"
                              mt="0.5rem"
                              w="100%"
                              textTransform="capitalize"
                           >
                              {value.product_name}
                           </Text>
                           <Text color="black" mt="0.5rem">
                              R$ {value.price}
                           </Text>
                        </Box>
                     </Box>
                  ))}

               {!dataProducts && !isLoading && <Text>Nada por aqui. 🤔</Text>}
            </Box>
         </Box>
      </Box>
   )
}
