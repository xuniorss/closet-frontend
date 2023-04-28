'use client'

import { Box, Text } from '@chakra-ui/react'
import { useParams } from 'next/navigation'

type ParamsProps = {
   productname: string
   productid: string
}

export default function ProductDetailsTemplate() {
   const params = useParams() as ParamsProps

   return (
      <Box>
         <Text>Produto id: {params.productid}</Text>
         <Text>Produto nome: {params.productname}</Text>
      </Box>
   )
}
