import { useAuth } from '@/hooks/useAuth'
import { Products } from '@/models/products'
import { Box, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import removeAccents from 'remove-accents'

export const CardProducts = ({ value }: { value: Products }) => {
   const { isAuthenticated } = useAuth()
   const router = useRouter()

   const handleWhatsApp = useCallback(() => {
      const message = `Olá, gostaria de informações sobre o produto ${value.product_name}.`

      const url = `${process.env.NEXT_PUBLIC_WHATSSAPP_MESSAGE_API}${encodeURIComponent(message)}`

      window.open(url)
   }, [value.product_name])

   const handleDetails = useCallback(
      (productName: string, id: string) => {
         const regex = /[^a-zA-Z0-9]/g
         const name = removeAccents(productName).replace(/\s+/g, '-').toLowerCase()

         const url = `/${name}/${id}`
         router.push(url)
      },
      [router]
   )

   return (
      <Box
         key={value.id}
         w="17.188rem"
         minH="27.5rem"
         borderRadius="5px"
         _hover={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
         cursor="pointer"
         onClick={() => handleDetails(value.product_name, value.id)}
         mb="1rem"
         as={isAuthenticated ? 'form' : Box}
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
   )
}
