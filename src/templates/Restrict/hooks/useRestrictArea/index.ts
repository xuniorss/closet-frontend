import { useAuth } from '@/hooks/useAuth'
import { useProductsContext } from '@/hooks/useProductsContext'
import { useSmallScreen } from '@/hooks/useSmallScreen'
import { ModelsPropsList } from '@/models/modelApi'
import { modelApi, productsApi } from '@/services/apis'
import { uploadImageProductStorate } from '@/services/firebase/requests/products'
import { queryClient } from '@/services/queryClient'
import { useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useId } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'

import { ProductsProps, schemaProducts } from '../../components/NewCategory/validator'

export const useRestrictArea = () => {
   const id = useId()
   const { files, filesSteate } = useProductsContext()
   const { authAdmin } = useAuth()

   const smallScreen = useSmallScreen()
   const toast = useToast()

   const { data: modelList } = useQuery<ModelsPropsList[]>({
      queryKey: process.env.NEXT_PUBLIC_ALL_MODELS,
      queryFn: () => modelApi.models(),
      enabled: authAdmin,
   })

   const { mutate } = useMutation(() => productsApi.list(), {
      onSuccess: () => {
         queryClient.invalidateQueries(process.env.NEXT_PUBLIC_ALL_PRODUCTS)
      },
   })

   const {
      handleSubmit,
      register,
      reset,
      control,
      setValue,
      formState: { isSubmitting, errors },
   } = useForm<ProductsProps>({
      criteriaMode: 'all',
      mode: 'all',
      reValidateMode: 'onChange',
      defaultValues: {
         price: '',
         size: [],
         product_name: '',
         quantity: 1,
         color: '#000001',
         composition: '',
      },
      resolver: zodResolver(schemaProducts),
   })

   const onSubmitProducts: SubmitHandler<ProductsProps> = useCallback(
      async (data) => {
         try {
            if (!authAdmin || !data || files.length <= 0) return

            await new Promise((resolve) => setTimeout(resolve, 1000))

            await uploadImageProductStorate({ files }).then(async (response) => {
               const mediaUrl = response.map((value) => value.mediaUrl)
               const mediaId = response.map((value) => value.mediaId)[0]

               const newData = {
                  image_url: mediaUrl,
                  mediaId,
                  ...data,
               }

               await productsApi.create(newData)

               mutate()
               filesSteate([])
               reset()
               setValue('size', [])
            })

            toast({
               title: 'Uma nova mercadoria foi salva 😍',
               status: 'success',
               isClosable: true,
               position: 'top',
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
      [authAdmin, files, toast, mutate, filesSteate, reset, setValue]
   )

   return {
      handleSubmit,
      onSubmitProducts,
      smallScreen,
      register,
      control,
      modelList,
      id,
      isSubmitting,
      errors,
   }
}
