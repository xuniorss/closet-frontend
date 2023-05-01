import { Box, HStack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { BsFillCreditCardFill, BsInstagram } from 'react-icons/bs'
import { MdOutlinePix } from 'react-icons/md'
import { FaMoneyBillWave } from 'react-icons/fa'

export const Infos = () => {
   return (
      <Box display="flex" flexDir="row" justifyContent="space-between" w="inherit">
         <Box display="flex" flexDir="column">
            <Text textTransform="uppercase" fontWeight="semibold">
               Formas de pagamento
            </Text>
            <HStack spacing={5} mt={3}>
               <MdOutlinePix size={25} />
               <BsFillCreditCardFill size={25} />
               <FaMoneyBillWave size={25} />
            </HStack>
         </Box>

         <Box>
            <Text textTransform="uppercase" fontWeight="semibold">
               Siga a Closet
            </Text>
            <HStack spacing={5} mt={3}>
               <Link href="https://www.instagram.com/closetguararapes/" target="_blank">
                  <BsInstagram size={25} cursor="pointer" />
               </Link>
            </HStack>
         </Box>
      </Box>
   )
}
