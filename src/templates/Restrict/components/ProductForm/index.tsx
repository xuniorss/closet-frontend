import { Box, Button, FormLabel, HStack, Image, Input, Tag } from '@chakra-ui/react'

import { useRestrictArea } from '../../hooks/useRestrictArea'
import { GenerateCod } from './components/GenerateCod'
import { Description, Price, ProductName, Quantity } from './components/Inputs'
import { SModel, SSizes } from './components/Selects'

export const ProductForm = () => {
   const {
      handleSubmit,
      onSubmitProducts,
      smallScreen,
      register,
      handleGenereteRandomId,
      control,
      isSubmitting,
      handleMediaChange,
      handleRemoveMedia,
      mediaUrl,
      id,
   } = useRestrictArea()

   return (
      <Box
         display="flex"
         flexDir="column"
         mt="10"
         as="form"
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
               <Box w={smallScreen ? '100%' : '30%'}>
                  <GenerateCod
                     form={{ register }}
                     handleGenereteRandomId={handleGenereteRandomId}
                  />
               </Box>
               <ProductName form={{ register }} />
               <SModel control={control} />

               <Box display="flex" gap={5} flexDir={smallScreen ? 'column' : 'row'}>
                  <SSizes control={control} />
                  <Price control={control} />
                  <Quantity form={{ register }} />
               </Box>
               <Description form={{ register }} />
            </Box>
            <Box>
               <HStack>
                  {!mediaUrl && (
                     <FormLabel textAlign="center" cursor="pointer" htmlFor={`${id}-prodctimage`}>
                        Selecionar a imagem
                     </FormLabel>
                  )}

                  {mediaUrl && (
                     <Tag
                        onClick={handleRemoveMedia}
                        mb={3}
                        bgColor="red.500"
                        cursor="pointer"
                        role="button"
                     >
                        Remover imagem
                     </Tag>
                  )}
               </HStack>

               <Input
                  id={`${id}-prodctimage`}
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple
                  display="none"
                  onChange={handleMediaChange}
               />

               {mediaUrl && (
                  <Image
                     src={mediaUrl}
                     objectFit="cover"
                     bgColor="gray.200"
                     w="21rem"
                     h="21rem"
                     alt="image"
                  />
               )}
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
