'use client'

import { useAuth } from '@/hooks/useAuth'
import { useProtectRoute } from '@/hooks/useProtectRoute'
import { ModelsPropsList } from '@/models/modelApi'
import { modelApi, productsApi } from '@/services/apis'
import {
   Box,
   Button,
   Flex,
   FormControl,
   FormLabel,
   HStack,
   Image,
   Input,
   Select,
   Tag,
   Textarea,
   useDisclosure,
   useMediaQuery,
   useToast,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, Dispatch, useCallback, useId, useReducer, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FiPlus } from 'react-icons/fi'
import { useQuery } from 'react-query'
import { NewModel } from './components/NewCategory'
import { ModelProps, ProductsProps, schemaProducts } from './components/NewCategory/validator'
import crypto from 'crypto'
import { uploadImageProductStorate } from '@/services/firebase/requests/products'

type SizeProps = {
   size: string
}

type State = {
   media: File | null
   mediaUrl: string
}

type Action = {
   type: 'UPLOAD_IMAGE'
   payload: Partial<State>
}

const reducer = (state: State, action: Action) => {
   switch (action.type) {
      case 'UPLOAD_IMAGE':
         return { ...state, ...action.payload }

      default:
         return state
   }
}

const useProducts = (initialState: State): [State, Dispatch<Action>] => {
   return useReducer(reducer, initialState)
}

const sizes: Array<SizeProps> = [{ size: 'p' }, { size: 'm' }, { size: 'g' }, { size: 'gg' }]

export default function RestrictAreaTemplate() {
   useProtectRoute()

   const { isAuthenticated } = useAuth()
   const id = useId()

   const [state, dispatch] = useProducts({ mediaUrl: '', media: null })

   const { isOpen, onOpen, onClose } = useDisclosure()
   const [smallScreen] = useMediaQuery('(max-width: 1250px)')
   const toast = useToast()

   const { data: modelList } = useQuery<ModelsPropsList[]>({
      queryKey: process.env.NEXT_PUBLIC_ALL_MODELS,
      queryFn: () => modelApi.models(),
      enabled: isAuthenticated,
   })

   const {
      handleSubmit,
      register,
      watch,
      reset,
      control,
      setValue,
      formState: { isSubmitting },
   } = useForm<ProductsProps>({
      criteriaMode: 'all',
      mode: 'all',
      reValidateMode: 'onChange',
      defaultValues: { product_code: '', product_name: '', price: 0, quantity: 0 },
      resolver: zodResolver(schemaProducts),
   })

   const onSubmitProducts: SubmitHandler<ProductsProps> = useCallback(
      async (data) => {
         try {
            if (!isAuthenticated) return

            const file = state.media as File

            await uploadImageProductStorate({ file }).then(async (response) => {
               const { mediaUrl, mediaId } = response

               const newData = {
                  image_url: mediaUrl,
                  image_id: mediaId,
                  ...data,
               }

               await productsApi.create(newData)
               reset()
               dispatch({ type: 'UPLOAD_IMAGE', payload: { media: null, mediaUrl: '' } })

               toast({
                  title: 'Uma nova mercadoria foi salva 😍',
                  status: 'success',
                  isClosable: true,
                  position: 'top',
               })
            })
         } catch (error) {
            toast({
               title: 'Ops...',
               description: 'Problema ao salvar esta mercadoria, contate suporte.',
               status: 'error',
               isClosable: true,
               position: 'top',
            })
            console.error(error)
         }
      },
      [isAuthenticated, reset, state.media, dispatch, toast]
   )

   const handleGenereteRandomId = useCallback(() => {
      const prodbytes = crypto.randomBytes(4)
      const prodnumber = prodbytes.readUInt32BE(0)
      const prodcod = prodnumber % 100000000

      const proddigit = crypto.randomBytes(1)
      const digit = proddigit[0] % 10

      const newProdCod = `${prodcod}-${digit}`

      setValue('product_code', newProdCod)
   }, [setValue])

   const handleMediaChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
         if (!event.target.files) return

         const media = event.target.files[0]
         if (!media) return

         if (media.type === 'image/jpeg' || media.type === 'image/png') {
            dispatch({ type: 'UPLOAD_IMAGE', payload: { media: media } })
            dispatch({
               type: 'UPLOAD_IMAGE',
               payload: { mediaUrl: URL.createObjectURL(event.target.files[0]) },
            })
         }
      },
      [dispatch]
   )

   const handleRemoveMedia = useCallback(() => {
      dispatch({ type: 'UPLOAD_IMAGE', payload: { media: null } })
      dispatch({ type: 'UPLOAD_IMAGE', payload: { mediaUrl: '' } })
   }, [dispatch])

   return (
      <Flex flexDir="column" mt="28">
         <Box display="flex" flexDir="column" pos="relative">
            <Box>
               <Button
                  bgColor="blue.300"
                  _hover={{ bgColor: 'blue.400' }}
                  color="white"
                  leftIcon={<FiPlus size={25} />}
                  onClick={onOpen}
                  type="button"
               >
                  Novo Modelo
               </Button>
            </Box>

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
                        {!state.mediaUrl && (
                           <FormLabel
                              textAlign="center"
                              cursor="pointer"
                              htmlFor={`${id}-prodctimage`}
                           >
                              Selecionar a imagem
                           </FormLabel>
                        )}

                        {state.mediaUrl && (
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

                     {state.mediaUrl && (
                        <Image
                           src={state.mediaUrl}
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

            <NewModel isOpen={isOpen} onClose={onClose} />
         </Box>
      </Flex>
   )
}
