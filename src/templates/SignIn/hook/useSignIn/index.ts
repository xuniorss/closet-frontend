import { useStore } from '@/components/useStore'
import { useAuthStore } from '@/store/auth'
import { useMediaQuery } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback, useId, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { schemaSignIn, SignInProps } from '../../validators'

export const useSignIn = () => {
   const [step, setStep] = useState(0)
   const id = useId()

   const store = useStore(useAuthStore, (state) => state)

   const router = useRouter()

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
         if (!data || !store) return

         try {
            await store.signIn(data).then(() => reset())
            router.push('/')
         } catch (error) {
            console.log(error)
         }
      },
      [store, reset, router]
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
