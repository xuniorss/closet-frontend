'use client'

import { Box, Flex, Link, Tag } from '@chakra-ui/react'
import NextLink from 'next/link'
import { ButtonRestrictArea } from './components/ButtonRestrictArea'

type NavLinkProps = {
   name: string
   path: string
}

const NavLink: Array<NavLinkProps> = [
   { name: 'Closet', path: '/' },
   { name: 'Catálogo', path: '/catalog' },
]

export const Navbar = () => {
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
         <Box maxW="78.125rem" w="100%" display="flex" justifyContent="space-between">
            <Box display="flex" flexDir="row" gap={5}>
               {NavLink.map((value) => (
                  <Link
                     key={value.name}
                     fontSize={20}
                     href={value.path}
                     fontWeight="medium"
                     as={NextLink}
                     textDecor="none"
                  >
                     {value.name}
                  </Link>
               ))}
            </Box>

            <ButtonRestrictArea />
         </Box>
      </Flex>
   )
}
