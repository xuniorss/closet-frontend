import { useProductsContext } from '@/hooks/useProductsContext'
import { Badge, Box, Link, Text } from '@chakra-ui/react'
import { AiFillHeart } from 'react-icons/ai'

export const ButtonWished = () => {
   const { wished } = useProductsContext()

   return (
      <Box
         display="flex"
         alignItems="center"
         justifyContent="center"
         pos="relative"
         w="45px"
         h="45px"
         cursor="pointer"
         as={Link}
         href="/wishlist"
      >
         <Badge bgColor="main.500" borderRadius="full" pos="absolute" right={0} mb={5}>
            <Text fontSize="sm" color="white" as="span">
               {(wished && wished.length) || 0}
            </Text>
         </Badge>
         <AiFillHeart size={30} color="red" />
      </Box>
   )
}
