import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@chakra-ui/react'
import { useCallback, useId } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ModelProps, schemaModels } from '../../validator'
import { modelApi } from '@/services/apis'

type NewModelHook = {
   onClose: () => void
}

export const useNewModel = ({ onClose }: NewModelHook) => {
   const id = useId()
   const { isAuthenticated } = useAuth()
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

   const onSubmit: SubmitHandler<ModelProps> = useCallback(
      async (data) => {
         if (!isAuthenticated) return

         try {
            await modelApi.createModel(data).then((response) => {
               const { model_name } = response

               reset()
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
      [isAuthenticated, reset, toast]
   )

   const handleCancel = useCallback(() => {
      onClose()
      reset()
   }, [onClose, reset])

   return { handleSubmit, handleCancel, watch, register, onSubmit, id, isSubmitting }
}
