import { useStore } from '@/components/useStore'
import { useSmallScreen } from '@/hooks/useSmallScreen'
import { ModelsPropsList } from '@/models/modelApi'
import { collectionApi, modelApi } from '@/services/apis'
import { queryClient } from '@/services/queryClient'
import { useAuthStore } from '@/store/auth'
import {
   Box,
   Button,
   Checkbox,
   FormControl,
   FormLabel,
   Input,
   Select,
   Tag,
   Text,
   Tooltip,
   useToast,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Fragment, useCallback, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { useMutation, useQuery } from 'react-query'
import { CollectionProps, schemaCollection } from '../../validators'

export const NewCollection = () => {
   const store = useStore(useAuthStore, (state) => state)
   const [creating, setCreating] = useState(false)

   const smallScreen = useSmallScreen()
   const toast = useToast()

   const { data: modelList } = useQuery<ModelsPropsList[]>({
      queryKey: process.env.NEXT_PUBLIC_ALL_MODELS,
      queryFn: () => modelApi.models(),
      enabled: store?.authAdmin,
   })

   const {
      handleSubmit,
      reset,
      watch,
      register,
      control,
      formState: { isSubmitting },
   } = useForm<CollectionProps>({
      criteriaMode: 'all',
      mode: 'all',
      reValidateMode: 'onChange',
      resolver: zodResolver(schemaCollection),
      defaultValues: {
         name: '',
         numItems: 3,
         showHome: false,
      },
   })

   const { mutate } = useMutation(() => collectionApi.list(), {
      onSuccess: () => {
         queryClient.invalidateQueries()
      },
   })

   const onSubmit: SubmitHandler<CollectionProps> = useCallback(
      async (data) => {
         try {
            if (!data) return

            await collectionApi.create(data)

            reset()
            mutate()

            toast({
               title: 'Coleção criada com sucesso',
               status: 'success',
               isClosable: true,
               duration: 3000,
               position: 'top',
            })
         } catch (error: any) {
            const { message } = error.response.data

            toast({
               title: 'Não foi possível criar esta coleção.',
               description: String(message),
               status: 'error',
               isClosable: true,
               duration: 3000,
               position: 'top',
            })
            console.error(error)
         }
      },
      [reset, toast, mutate]
   )

   return (
      <Fragment>
         {store && store.authAdmin && (
            <Box display="flex" flexDir="row" alignItems="center" gap={4}>
               <Button
                  type="button"
                  onClick={() => setCreating(true)}
                  colorScheme="facebook"
                  isDisabled={creating}
               >
                  {smallScreen ? 'Criar' : 'Criar coleção'}
               </Button>
               {creating && (
                  <Tag color="orange.500" colorScheme="orange">
                     Modo de criação ativado.
                  </Tag>
               )}
            </Box>
         )}
         <Box mt={3} display="flex" flexDir="column">
            {creating && (
               <Box
                  display="flex"
                  flexDir="column"
                  gap={4}
                  as="form"
                  onSubmit={handleSubmit(onSubmit)}
               >
                  <FormControl>
                     <FormLabel display="flex" flexDir="row" alignItems="center" gap={3}>
                        Nome da coleção{' '}
                        <Tooltip label="Você pode escolher qualquer nome para sua coleção.">
                           <Text cursor="pointer">{<FaRegQuestionCircle size={20} />}</Text>
                        </Tooltip>
                        <Text>({watch('name')?.length}/30)</Text>
                     </FormLabel>
                     <Input
                        placeholder="Ex: COLEÇÃO VERÃO 🌞"
                        textTransform="uppercase"
                        fontSize="lg"
                        {...register('name', { required: true })}
                        maxLength={30}
                     />
                  </FormControl>
                  {modelList && (
                     <FormControl>
                        <FormLabel display="flex" flexDir="row" alignItems="center" gap={3}>
                           Modelo da coleção{' '}
                           <Tooltip label="As mercadorias relacionadas ao modelo escolhido serão selecionadas automaticamente.">
                              <Text cursor="pointer">{<FaRegQuestionCircle size={20} />}</Text>
                           </Tooltip>
                        </FormLabel>
                        <Controller
                           control={control}
                           name="modelId"
                           render={({ field }) => (
                              <Select placeholder="Escolha o modelo para a nova coleção" {...field}>
                                 {modelList.map((model) => (
                                    <option key={model.id} value={model.id}>
                                       {model.model_name}
                                    </option>
                                 ))}
                              </Select>
                           )}
                        />
                     </FormControl>
                  )}

                  <Box
                     display="flex"
                     flexDir={smallScreen ? 'column' : 'row'}
                     alignItems="center"
                     gap={3}
                  >
                     <FormControl>
                        <FormLabel>
                           Qts itens mostrar para esta coleção?{' '}
                           <Text as="span" color="#c7c5c5">
                              (padrão 3)
                           </Text>
                        </FormLabel>
                        <Input
                           type="number"
                           defaultValue={3}
                           {...register('numItems', { valueAsNumber: true })}
                        />
                     </FormControl>

                     <FormControl>
                        <FormLabel>Qual a data final para essa coleção?</FormLabel>
                        <Input type="date" {...register('finalDate', { valueAsDate: true })} />
                     </FormControl>
                  </Box>
                  <FormControl>
                     <Checkbox size="lg" colorScheme="orange" {...register('showHome')}>
                        Mostrar na página inicial ?
                     </Checkbox>
                  </FormControl>
                  <Box mt={3} display="flex" flexDir="row" justifyContent="flex-end" gap={3}>
                     <Button onClick={() => setCreating(false)} type="button" colorScheme="red">
                        Cancelar
                     </Button>
                     <Button
                        type="submit"
                        colorScheme="green"
                        loadingText="Criando"
                        isLoading={isSubmitting}
                     >
                        Criar
                     </Button>
                  </Box>
               </Box>
            )}
         </Box>
      </Fragment>
   )
}
