import {
   Box,
   Button,
   FormControl,
   FormLabel,
   HStack,
   Image,
   Input,
   Select,
   Tag,
   Textarea,
} from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import { sizes } from '../../constants/sizes'
import { useRestrictArea } from '../../hooks/useRestrictArea'

export const ProductForm = () => {
   const {
      handleSubmit,
      onSubmitProducts,
      smallScreen,
      register,
      handleGenereteRandomId,
      control,
      modelList,
      mediaUrl,
      handleMediaChange,
      id,
      handleRemoveMedia,
      isSubmitting,
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
                  <FormControl>
                     <FormLabel>Gerar código da mercadoria</FormLabel>
                     <Box display="flex" alignItems="center" justifyContent="center" gap={3}>
                        <Input
                           bgColor="#F1F1F1"
                           color="black"
                           readOnly
                           {...register('product_code', { required: true })}
                        />
                        <Button
                           color="white"
                           type="button"
                           cursor="pointer"
                           bgColor="blue.700"
                           _hover={{ bgColor: 'blue.900' }}
                           onClick={handleGenereteRandomId}
                        >
                           Gerar
                        </Button>
                     </Box>
                  </FormControl>
               </Box>
               <FormControl>
                  <FormLabel>Nome da mercadoria</FormLabel>
                  <Input
                     bgColor="#F1F1F1"
                     placeholder="Informe o nome da mercadoria"
                     _placeholder={{ color: '#cfcfcf' }}
                     size="lg"
                     userSelect="none"
                     autoComplete="off"
                     {...register('product_name', { required: true })}
                  />
               </FormControl>

               <FormControl>
                  <FormLabel>Modelo</FormLabel>
                  <Controller
                     control={control}
                     name="model_id"
                     render={({ field }) => (
                        <Select
                           placeholder="Escolha o modelo"
                           _placeholder={{ bgColor: '#F1F1F1', color: '#cfcfcf' }}
                           bgColor="#F1F1F1"
                           size="lg"
                           {...field}
                        >
                           {modelList &&
                              modelList.map((value) => (
                                 <option
                                    style={{ backgroundColor: '#F1F1F1' }}
                                    key={value.id}
                                    value={value.id}
                                 >
                                    {value.model_name}
                                 </option>
                              ))}
                        </Select>
                     )}
                  />
               </FormControl>

               <Box display="flex" gap={5} flexDir={smallScreen ? 'column' : 'row'}>
                  <FormControl>
                     <FormLabel>Tamanho</FormLabel>
                     <Controller
                        control={control}
                        name="size"
                        render={({ field }) => (
                           <Select
                              placeholder="Escolha o tamanho"
                              bgColor="#F1F1F1"
                              size="lg"
                              {...field}
                           >
                              {sizes.map((value) => (
                                 <option
                                    style={{ backgroundColor: '#F1F1F1' }}
                                    key={value.size}
                                    value={value.size}
                                 >
                                    {value.size.toUpperCase()}
                                 </option>
                              ))}
                           </Select>
                        )}
                     />
                  </FormControl>

                  <FormControl>
                     <FormLabel>Valor</FormLabel>
                     <Input
                        bgColor="#F1F1F1"
                        size="lg"
                        type="number"
                        {...register('price', { required: true, valueAsNumber: true })}
                     />
                  </FormControl>

                  <FormControl>
                     <FormLabel>Quantidade</FormLabel>
                     <Input
                        bgColor="#F1F1F1"
                        size="lg"
                        type="number"
                        {...register('quantity', { required: true, valueAsNumber: true })}
                     />
                  </FormControl>
               </Box>
               <FormControl>
                  <FormLabel>
                     Descrição <span style={{ color: '#b6b6b6' }}>(opcional)</span>
                  </FormLabel>
                  <Textarea
                     bgColor="#F1F1F1"
                     size="lg"
                     {...register('description', { required: true })}
                  />
               </FormControl>
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
