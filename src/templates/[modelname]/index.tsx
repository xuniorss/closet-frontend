'use client'

import { CardProducts } from '@/components/ProductsList/components/CardProducts'
import { Products } from '@/models/products'
import { productsApi } from '@/services/apis'
import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

export default function ModelTemplate() {
   const [modelid, setModelId] = useState('')

   useEffect(() => {
      if (!localStorage.getItem(`${process.env.NEXT_PUBLIC_MODEL_STORAGE}`)) {
         setModelId('')
         return
      }

      const modelid = localStorage.getItem(`${process.env.NEXT_PUBLIC_MODEL_STORAGE}`) as string

      setModelId(modelid)
   }, [])

   const { data } = useQuery<Products[]>({
      queryKey: `products.model.${modelid}`,
      queryFn: () => productsApi.productsByModel(modelid),
      cacheTime: 60000,
      staleTime: 30000,
      enabled: !!modelid,
   })

   return (
      <Box display="flex" flexDir="column" minH="calc(100vh - 15rem)">
         <Box mt="3.5rem" display="flex" justifyContent="center" flexDir="column">
            <Box
               mt="2rem"
               display="flex"
               justifyContent="center"
               flexDir="row"
               flexWrap="wrap"
               gap={5}
            >
               {data &&
                  data.length > 0 &&
                  data.map((value) => <CardProducts key={value.id} value={value} />)}
            </Box>
         </Box>
      </Box>
   )
}
