'use client'

import { Box, Text } from '@chakra-ui/react'
import { useParams } from 'next/navigation'

export default function ModelTemplate() {
   const params = useParams()

   return (
      <Box display="flex" flexDir="column" minH="calc(100vh - 15rem)">
         <Box mt="3.5rem">
            <p>EM DESENVOLVIMENTO</p>
         </Box>
      </Box>
   )
}
