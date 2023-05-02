import { useSmallScreen } from '@/hooks/useSmallScreen'
import { Products } from '@/models/products'
import { Box, Button } from '@chakra-ui/react'
import { useCallback } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

export const ButtonKnowMore = ({ product }: { product: Products }) => {
   const smallScreen = useSmallScreen()

   const handleWhatsApp = useCallback(() => {
      const message = `Olá, gostaria de informações sobre o produto "${product.product_name}"`

      const url = `${process.env.NEXT_PUBLIC_WHATSSAPP_MESSAGE_API}${encodeURIComponent(message)}`

      window.open(url)
   }, [product.product_name])

   return (
      <Box mb={5}>
         <Button
            w="100%"
            height={smallScreen ? '16' : '12'}
            _hover={{ bgColor: '#008844' }}
            bgColor="#3BCD41"
            color="white"
            fontSize="larger"
            fontWeight="bold"
            borderRadius={smallScreen ? 'none' : 'lg'}
            pos={smallScreen ? 'fixed' : 'relative'}
            bottom={0}
            right={0}
            left={0}
            leftIcon={<FaWhatsapp size={25} />}
            onClick={handleWhatsApp}
            zIndex={smallScreen ? '999' : '0'}
         >
            Saiba mais
         </Button>
      </Box>
   )
}
