import { useAuth } from '@/hooks/useAuth'
import { useSmallScreen } from '@/hooks/useSmallScreen'
import { ModelsPropsList } from '@/models/modelApi'
import { modelApi, productsApi } from '@/services/apis'
import { uploadImageProductStorate } from '@/services/firebase/requests/products'
import { queryClient } from '@/services/queryClient'
import { useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useId, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'

import { ProductsProps, schemaProducts } from '../../components/NewCategory/validator'
import { useProducts } from '../useProducts'

export const useRestrictArea = () => {
   const id = useId()
   const [files, setFiles] = useState<File[]>([])

   const { authAdmin } = useAuth()
   const [state, dispatch] = useProducts({ mediaUrl: '', media: null })

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
      watch,
      formState: { isSubmitting, errors },
   } = useForm<ProductsProps>({
      criteriaMode: 'all',
      mode: 'all',
      reValidateMode: 'onChange',
      defaultValues: { price: '', size: [], product_name: '', quantity: 1 },
      resolver: zodResolver(schemaProducts),
   })

   const onSubmitProducts: SubmitHandler<ProductsProps> = useCallback(
      async (data) => {
         try {
            if (!authAdmin || !data || files.length <= 0) return

            await uploadImageProductStorate({ files }).then(async (response) => {
               const mediaUrl = response.map((value) => value.mediaUrl)

               const newData = {
                  image_url: mediaUrl,
                  ...data,
               }

               await productsApi.create(newData)
               mutate()
               reset()
               setFiles([])
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
      [authAdmin, files, toast, mutate, reset, setValue]
   )

   const handleImagesUpload = useCallback((newFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
   }, [])

   return {
      handleSubmit,
      onSubmitProducts,
      smallScreen,
      register,
      control,
      modelList,
      id,
      isSubmitting,
      handleImagesUpload,
      errors,
   }
}
