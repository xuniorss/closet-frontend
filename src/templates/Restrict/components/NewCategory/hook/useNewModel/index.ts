import { useStore } from '@/components/useStore'
import { modelApi } from '@/services/apis'
import { queryClient } from '@/services/queryClient'
import { useAuthStore } from '@/store/auth'
import { useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useId } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

import { ModelProps, schemaModels } from '../../validator'

type NewModelHook = {
   onClose: () => void
}

export const useNewModel = ({ onClose }: NewModelHook) => {
   const id = useId()
   const store = useStore(useAuthStore, (state) => state)
   const toast = useToast()

   const {
      handleSubmit,
      reset,
      watch,
      register,
      formState: { isSubmitting },
   } = useForm<ModelProps>({
      criteriaMode: 'all',
      mode: 'all',
      reValidateMode: 'onChange',
      resolver: zodResolver(schemaModels),
   })

   const { mutate } = useMutation(() => modelApi.models(), {
      onSuccess: () => {
         queryClient.invalidateQueries(process.env.NEXT_PUBLIC_ALL_MODELS)
      },
   })

   const onSubmit: SubmitHandler<ModelProps> = useCallback(
      async (data) => {
         if (!store?.authAdmin) return

         try {
            await modelApi.createModel(data).then((response) => {
               const { model_name } = response

               reset()
               mutate()
               toast({
                  title: 'Novo modelo cadastrado',
                  description: `Cadastramos ${model_name} para você 😉`,
                  status: 'success',
                  position: 'top',
                  isClosable: true,
               })
            })
         } catch (error: any) {
            toast({
               title: 'Não foi possível cadastrar',
               description: `${error.response.data.message}`,
               status: 'error',
               position: 'top',
               isClosable: true,
            })
            console.error(error)
         }
      },
      [store?.authAdmin, reset, mutate, toast]
   )

   const handleCancel = useCallback(() => {
      onClose()
      reset()
   }, [onClose, reset])

   return { handleSubmit, handleCancel, watch, register, onSubmit, id, isSubmitting }
}
