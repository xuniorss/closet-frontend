import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useId, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { schemaSignIn, SignInProps } from '../../validators'

export const useSignIn = () => {
   const [step, setStep] = useState(0)
   const id = useId()

   const stepSetState = useCallback((value: number) => {
      setStep(value)
   }, [])

   const {
      handleSubmit,
      register,
      watch,
      formState: { isSubmitting, errors },
   } = useForm<SignInProps>({
      criteriaMode: 'all',
      mode: 'all',
      reValidateMode: 'onChange',
      resolver: zodResolver(schemaSignIn),
   })

   const onSubmit: SubmitHandler<SignInProps> = useCallback((data) => {
      if (!data) return
      console.log(data)
   }, [])

   return { step, stepSetState, register, handleSubmit, errors, onSubmit, watch, id }
}
