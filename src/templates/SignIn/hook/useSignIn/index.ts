import { useAuth } from '@/hooks/useAuth'
import { useMediaQuery } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useId, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { schemaSignIn, SignInProps } from '../../validators'

export const useSignIn = () => {
   const { signIn } = useAuth()
   const [step, setStep] = useState(0)
   const id = useId()

   const stepSetState = useCallback((value: number) => {
      setStep(value)
   }, [])

   const [mobileScreen] = useMediaQuery('(max-width: 550px)')

   const {
      handleSubmit,
      register,
      watch,
      reset,
      formState: { isSubmitting, errors },
   } = useForm<SignInProps>({
      criteriaMode: 'all',
      mode: 'all',
      reValidateMode: 'onChange',
      resolver: zodResolver(schemaSignIn),
   })

   const onSubmit: SubmitHandler<SignInProps> = useCallback(
      async (data) => {
         if (!data) return

         try {
            await signIn(data).then(() => reset())
         } catch (error) {
            console.log(error)
         }
      },
      [signIn, reset]
   )

   return {
      step,
      stepSetState,
      register,
      handleSubmit,
      errors,
      onSubmit,
      watch,
      id,
      isSubmitting,
      mobileScreen,
   }
}
