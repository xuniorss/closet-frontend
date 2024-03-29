import { useStore } from '@/components/useStore'
import { Products } from '@/models/products'
import { useAuthStore } from '@/store/auth'
import { Box, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import removeAccents from 'remove-accents'

export const CardProducts = ({ value }: { value: Products }) => {
   const store = useStore(useAuthStore, (state) => state)
   const router = useRouter()

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
         as={store && store.authAdmin ? 'form' : Box}
      >
         <Box
            bgColor="card.bg"
            borderTopLeftRadius="5px"
            borderTopRightRadius="5px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgImage={value.image_url}
            w="inherit"
            h="20.938rem"
         >
            <Image
               src={value.image_url}
               alt="image-prod"
               objectFit="cover"
               w="100%"
               h="100%"
               borderTopLeftRadius="inherit"
               borderTopRightRadius="inherit"
            />
         </Box>
         <Box p="1">
            <Text
               fontSize="16px"
               lineHeight="24px"
               color="card.color"
               textAlign="start"
               fontWeight="normal"
               mt="0.5rem"
               w="100%"
               textTransform="capitalize"
            >
               {value.product_name}
            </Text>
            {store && store.authAdmin && (
               <Text color="black" mt="0.5rem">
                  R$ {value.price}
               </Text>
            )}
         </Box>
      </Box>
   )
}
