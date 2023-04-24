'use client'

import { useAuth } from '@/hooks/useAuth'
import { Box, Flex } from '@chakra-ui/react'

export default function HomeTemplate() {
   const { user } = useAuth()

   console.log(user)

   return (
      <Flex>
         <h1>Bem-vindo à loja Closet {user && user.username}</h1>
      </Flex>
   )
}
