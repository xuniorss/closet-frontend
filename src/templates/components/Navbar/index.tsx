'use client'

import { ModelsPropsList } from '@/models/modelApi'
import { modelApi } from '@/services/apis'
import { Box, Flex, Input, Link, Text, Tooltip } from '@chakra-ui/react'
import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { KeyboardEvent, useDeferredValue, useState } from 'react'
import { useQuery } from 'react-query'
import { ButtonRestrictArea } from './components/ButtonRestrictArea'
import removeAccents from 'remove-accents'

const subNavLinks = [
   { label: 'Roupas', href: '/roupas' },
   { label: 'Calçados', href: '/calcados' },
   { label: 'Acessórios', href: '/acessorios' },
]

export const Navbar = () => {
   const [search, setSearch] = useState('')
   const defferedSearch = useDeferredValue(search)
   const router = useRouter()
   const path = usePathname()

   const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (defferedSearch.length <= 3) return
      if (event.key === 'Enter') handleSearch()
   }

   const handleSearch = () => {
      router.push(`/search?q=${defferedSearch.toLowerCase()}`)
      setSearch('')
   }

   const { data: models } = useQuery<ModelsPropsList[]>({
      queryKey: process.env.NEXT_PUBLIC_ALL_MODELS,
      queryFn: () => modelApi.models(),
   })

   return (
      <>
         <Flex
            alignItems="center"
            justifyContent="center"
            wrap="wrap"
            w="100%"
            h="5rem"
            borderBottom="1px solid #00000022"
            position="fixed"
            top="0"
            zIndex="10"
            bg="white"
         >
            <Box w="100%" display="flex" flexDir="column" alignItems="center">
               <Box maxW="78.125rem" w="100%" display="flex" justifyContent="space-between" p={4}>
                  <Box display="flex" alignItems="center" flexDir="row" gap={5}>
                     <NextLink href="/">
                        <Text fontSize="2xl" fontWeight="medium">
                           Closet
                        </Text>
                     </NextLink>
                  </Box>

                  {path !== '/signin' && (
                     <Box
                        display="flex"
                        flexDir="row"
                        alignItems="center"
                        justifyContent="center"
                        w="100%"
                     >
                        <Input
                           w="50%"
                           bgColor="white.500"
                           type="search"
                           placeholder="O que você está procurando ?"
                           _placeholder={{ color: 'placeholder.500' }}
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                           onKeyDown={handleKeyDown}
                        />
                     </Box>
                  )}

                  <ButtonRestrictArea />
               </Box>
               {path !== '/signin' && path !== '/restrict' && (
                  <Box bg="gray.100" w="100%">
                     <Flex justify="center" align="center" py={2}>
                        {models &&
                           models.map(({ id, model_name }) => (
                              <Link
                                 key={id}
                                 mr={4}
                                 px={2}
                                 py={1}
                                 borderRadius="md"
                                 fontWeight="medium"
                                 fontSize="sm"
                                 bg={
                                    path === `/${removeAccents(model_name).toLowerCase()}`
                                       ? 'white'
                                       : 'transparent'
                                 }
                                 color={
                                    path === `/${removeAccents(model_name).toLowerCase()}`
                                       ? 'gray.800'
                                       : 'gray.700'
                                 }
                                 _hover={{ textDecoration: 'none', bg: 'white', color: 'gray.800' }}
                                 href={`/${removeAccents(model_name).toLowerCase()}`}
                              >
                                 <Tooltip
                                    label={`Ir para ${removeAccents(model_name).toLowerCase()}`}
                                 >
                                    {model_name}
                                 </Tooltip>
                              </Link>
                           ))}
                     </Flex>
                     {/* <Text textAlign="center" fontSize="xs" color="gray.500">
                     Frete Grátis em compras acima de R$ 99,00*
                  </Text> */}
                  </Box>
               )}
            </Box>
         </Flex>
      </>
   )
}
