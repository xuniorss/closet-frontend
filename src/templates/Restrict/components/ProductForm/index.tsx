import { Box, Button } from '@chakra-ui/react'

import { useRestrictArea } from '../../hooks/useRestrictArea'
import { ImagesUpload } from './components/Images'
import { Description, Price, ProductName, Quantity } from './components/Inputs'
import { SModel, SSizes } from './components/Selects'

export const ProductForm = () => {
   const {
      handleSubmit,
      onSubmitProducts,
      smallScreen,
      register,
      control,
      isSubmitting,
      handleImagesUpload,
   } = useRestrictArea()

   return (
      <Box
         display="flex"
         flexDir="column"
         mt="10"
         as="form"
         mb="10"
         onSubmit={handleSubmit(onSubmitProducts)}
      >
         <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDir={smallScreen ? 'column' : 'row'}
            gap={4}
         >
            <Box w="100%" display="flex" flexDir="column" gap={5}>
               <ImagesUpload onUpload={handleImagesUpload} />

               <ProductName form={{ register }} />

               <Box display="flex" gap={5} flexDir={smallScreen ? 'column' : 'row'}>
                  <SModel control={control} />
                  <Price control={control} />
                  <Quantity form={{ register }} />
               </Box>
               <SSizes form={{ register }} />
               <Description form={{ register }} />
            </Box>
         </Box>
         <Box
            mt={smallScreen ? 0 : 5}
            pos={smallScreen ? 'absolute' : 'relative'}
            right={0}
            top={0}
         >
            <Button
               type="submit"
               bgColor="green.300"
               _hover={{ bgColor: 'green.400' }}
               color="white"
               isLoading={isSubmitting}
            >
               Salvar
            </Button>
         </Box>
      </Box>
   )
}
