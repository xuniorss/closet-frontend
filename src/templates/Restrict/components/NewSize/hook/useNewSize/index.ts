import { useAuth } from '@/hooks/useAuth'
import { sizeApi } from '@/services/apis'
import { queryClient } from '@/services/queryClient'
import { useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useId } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { schemaSizes, SizeProps } from '../../validator'

type NewSizeHook = {
   onClose: () => void
}

export const useNewSize = ({ onClose }: NewSizeHook) => {
   const id = useId()
   const { isAuthenticated } = useAuth()
   const toast = useToast()

   const {
      handleSubmit,
      reset,
      watch,
      register,
      formState: { isSubmitting },
   } = useForm<SizeProps>({
      criteriaMode: 'all',
      mode: 'all',
      reValidateMode: 'onChange',
      resolver: zodResolver(schemaSizes),
   })

   const { mutate } = useMutation(() => sizeApi.index(), {
      onSuccess: () => {
         queryClient.invalidateQueries(process.env.NEXT_PUBLIC_ALL_SIZES)
      },
   })

   const onSubmit: SubmitHandler<SizeProps> = useCallback(
      async (data) => {
         if (!isAuthenticated) return

         try {
            await sizeApi.create(data)
            reset()
            mutate()
            toast({
               title: 'Novo tamanho cadastrado',
               status: 'success',
               position: 'top',
               isClosable: true,
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
      [isAuthenticated, mutate, reset, toast]
   )

   const handleCancel = useCallback(() => {
      onClose()
      reset()
   }, [onClose, reset])

   return {
      handleSubmit,
      handleCancel,
      watch,
      register,
      onSubmit,
      id,
      isSubmitting,
   }
}
