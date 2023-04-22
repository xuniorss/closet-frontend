import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { schemaSignIn, SignInProps } from '../../validators'
import { zodResolver } from '@hookform/resolvers/zod'

export const useSignIn = () => {
   const [step, setStep] = useState(0)

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

   useEffect(() => {
      console.log(errors)
   }, [errors])

   const onSubmit: SubmitHandler<SignInProps> = useCallback((data) => {
      console.log(data)
   }, [])

   return { step, stepSetState, register, handleSubmit, errors, onSubmit, watch }
}
