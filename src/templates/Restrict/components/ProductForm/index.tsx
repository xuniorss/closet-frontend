import { Box, Button, Text } from '@chakra-ui/react'

import { useRestrictArea } from '../../hooks/useRestrictArea'
import { ImagesUpload } from './components/Images'
import { Description, Price, ProductName, Quantity } from './components/Inputs'
import { SModel, SSizes } from './components/Selects'
import { Specifications } from './components/Specifications'

export const ProductForm = () => {
   const {
      handleSubmit,
      onSubmitProducts,
      smallScreen,
      register,
      control,
      isSubmitting,
      errors,
      debit,
      handleCalc,
      creditVista,
      creditParcel,
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
         <Box mb={4} border="2px dashed red" p={4}>
            <Text>Valores a ser cobrado na maquininha Pag Bank</Text>
            <Box color="red">
               <Text>
                  <span style={{ fontWeight: 'bold' }}>DÉBITO NA HORA</span> (1,99%): R$ {debit}
               </Text>
               <Text>
                  <span style={{ fontWeight: 'bold' }}>CRÉDITO NA HORA À VISTA</span> (4,99%): R${' '}
                  {creditVista}
               </Text>
               <Text>
                  <span style={{ fontWeight: 'bold' }}>CRÉDITO NA HORA PARCELADO</span> (5,59%): R${' '}
                  {creditParcel}
               </Text>
            </Box>

            <Button onClick={handleCalc}>Calcular</Button>
         </Box>
         <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDir={smallScreen ? 'column' : 'row'}
            gap={4}
         >
            <Box w="100%" display="flex" flexDir="column" gap={5}>
               <ImagesUpload />

               <ProductName form={{ register }} errors={errors.product_name?.message} />

               <Box display="flex" gap={5} flexDir={smallScreen ? 'column' : 'row'}>
                  <SModel control={control} errors={errors.model_id?.message} />
                  <Price control={control} errors={errors.price?.message} />
                  <Quantity form={{ register }} />
               </Box>
               <SSizes form={{ register }} errors={errors.size?.message} />
               <Description form={{ register }} />
               <Specifications form={{ register }} />
            </Box>
         </Box>
         <Box
            mt={smallScreen ? 0 : 5}
            pos={smallScreen ? 'absolute' : 'relative'}
            right={0}
            top={0}
            display="flex"
            flexDir="row"
            justifyContent="flex-end"
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
