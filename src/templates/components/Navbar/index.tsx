'use client'

import { useSmallScreen } from '@/hooks/useSmallScreen'
import { Box, Flex, Input, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { KeyboardEvent, useCallback, useDeferredValue, useState } from 'react'
import { ButtonRestrictArea } from './components/ButtonRestrictArea'
import { SubNavbar } from './components/SubNavbar'

export const Navbar = () => {
   const [search, setSearch] = useState('')
   const defferedSearch = useDeferredValue(search)
   const router = useRouter()
   const path = usePathname()
   const smallScreen = useSmallScreen()

   const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (defferedSearch.length <= 3) return
      if (event.key === 'Enter') handleSearch()
   }

   const handleSearch = useCallback(() => {
      router.push(`/search?q=${defferedSearch.toLowerCase()}`)
      setSearch('')
   }, [defferedSearch, router])

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
                           {smallScreen ? 'C.' : 'Closet'}
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
               <SubNavbar />
            </Box>
         </Flex>
      </>
   )
}
