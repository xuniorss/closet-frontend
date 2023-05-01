import { Box, Text } from '@chakra-ui/react'

export const Copyright = () => {
   const currDate = new Date()

   return (
      <Box display="flex" flexDir="column" alignItems="center" justifyContent="center" w="inherit">
         <Text fontSize="sm">
            &copy; Copyright
            {` 2019 - ${currDate.getFullYear()}. Todos os direitos reservados. Loja Closet.`}
         </Text>
         <Text fontSize="sm">SP - Brasil</Text>
      </Box>
   )
}
