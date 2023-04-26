import {
   Box,
   FormControl,
   FormErrorMessage,
   FormHelperText,
   FormLabel,
   Input,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { useSignIn } from '../../hook/useSignIn'
import { Buttons } from '../Buttons'

export const FormComponent = () => {
   const {
      errors,
      handleSubmit,
      onSubmit,
      step,
      register,
      stepSetState,
      watch,
      id,
      isSubmitting,
      mobileScreen,
   } = useSignIn()

   return (
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
         {step === 0 && (
            <Box
               as={motion.div}
               key="step0"
               initial={{ x: 0 }}
               animate={{ x: 0 }}
               exit={{ x: '-100%' }}
               mt="5.625rem"
               display="flex"
               flexDir="column"
            >
               <FormControl isInvalid={!!errors.email}>
                  <FormLabel htmlFor={`${id}-email`}>E-mail</FormLabel>
                  <Input
                     id={`${id}-email`}
                     bgColor="#F1F1F1"
                     _placeholder={{ color: 'black' }}
                     placeholder="Informe o e-mail de cadastro"
                     type="email"
                     w={mobileScreen ? '18rem' : '29.375rem'}
                     h="4.063rem"
                     fontSize="lg"
                     {...register('email', { required: true })}
                  />

                  {errors.email && (
                     <FormErrorMessage color="red.500">{errors.email.message}</FormErrorMessage>
                  )}

                  {!errors.email && (
                     <FormHelperText color="blackAlpha.500">
                        Nunca vamos compartilhar seu e-mail com ninguém
                     </FormHelperText>
                  )}
               </FormControl>

               <Box display="flex" justifyContent="flex-end" mt="2.5rem">
                  <Buttons
                     label="Avançar"
                     onClick={() => stepSetState(1)}
                     isDisabled={watch('email') === '' || !!errors.email}
                  />
               </Box>
            </Box>
         )}

         {step === 1 && (
            <Box
               as={motion.div}
               key="step1"
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '-100%' }}
               mt="5.625rem"
               display="flex"
               flexDir="column"
            >
               <FormControl isInvalid={!!errors.password}>
                  <FormLabel htmlFor={`${id}-password`}>Senha</FormLabel>
                  <Input
                     id={`${id}-password`}
                     bgColor="#F1F1F1"
                     _placeholder={{ color: 'black' }}
                     placeholder="Informe a senha de cadastro"
                     type="password"
                     w={mobileScreen ? '18rem' : '29.375rem'}
                     h="4.063rem"
                     fontSize="lg"
                     {...register('password', { required: true })}
                  />

                  {errors.password && (
                     <FormErrorMessage color="red.500">{errors.password.message}</FormErrorMessage>
                  )}
               </FormControl>

               <Box display="flex" justifyContent="space-between" mt="2.5rem">
                  <Buttons label="Voltar" onClick={() => stepSetState(0)} isBack />
                  <Buttons label="Acessar" btnSubmit isLoading={isSubmitting} />
               </Box>
            </Box>
         )}
      </Box>
   )
}
