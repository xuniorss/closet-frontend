'use client'

import { Box, Flex, Input, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { KeyboardEvent, useDeferredValue, useState } from 'react'
import { ButtonRestrictArea } from './components/ButtonRestrictArea'

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

   return (
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
         <Box maxW="78.125rem" w="100%" display="flex" justifyContent="space-between" p={4}>
            <Box display="flex" alignItems="center" flexDir="row" gap={5}>
               <NextLink href="/">
                  <Text fontSize="lg" fontWeight="medium">
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
      </Flex>
   )
}
