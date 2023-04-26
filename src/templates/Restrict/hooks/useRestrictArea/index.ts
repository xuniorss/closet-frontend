import { useAuth } from '@/hooks/useAuth'
import { ModelsPropsList } from '@/models/modelApi'
import { modelApi, productsApi } from '@/services/apis'
import { uploadImageProductStorate } from '@/services/firebase/requests/products'
import { useMediaQuery, useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import crypto from 'crypto'
import { ChangeEvent, useCallback, useId } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { ProductsProps, schemaProducts } from '../../components/NewCategory/validator'
import { useProducts } from '../useProducts'

export const useRestrictArea = () => {
   const id = useId()

   const { isAuthenticated } = useAuth()
   const [state, dispatch] = useProducts({ mediaUrl: '', media: null })

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

   return {
      handleSubmit,
      onSubmitProducts,
      smallScreen,
      register,
      handleGenereteRandomId,
      control,
      modelList,
      mediaUrl: state.mediaUrl,
      handleMediaChange,
      id,
      handleRemoveMedia,
      isSubmitting,
   }
}
