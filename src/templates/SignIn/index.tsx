'use client'

import { Box, Button, Heading, Input } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function SignInTemplate() {
   const [step, setStep] = useState(0)

   return (
      <Box display="flex" flexDir="column" textAlign="center" alignItems="center" mt="8.438rem">
         <Heading color="#D4BF90" fontWeight="semibold">
            Informe seus dados e tenha acesso a área restrita.
         </Heading>

         <Box as="form">
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
                  <Input
                     bgColor="#F1F1F1"
                     _placeholder={{ color: 'black' }}
                     placeholder="Informe o e-mail de cadastro"
                     type="email"
                     w="29.375rem"
                     h="4.063rem"
                     fontSize="lg"
                  />

                  <Box display="flex" justifyContent="flex-end" mt="2.5rem">
                     <Button
                        as={motion.button}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        bgColor="#D4BF90"
                        _hover={{ bgColor: '#d4be90e2' }}
                        color="white"
                        onClick={() => setStep(1)}
                     >
                        Avançar
                     </Button>
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
                  <Input
                     bgColor="#F1F1F1"
                     _placeholder={{ color: 'black' }}
                     placeholder="Informe a senha de cadastro"
                     type="password"
                     w="29.375rem"
                     h="4.063rem"
                     fontSize="lg"
                  />

                  <Box display="flex" justifyContent="space-between" mt="2.5rem">
                     <Button
                        as={motion.button}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        color="#D4BF90"
                        variant="ghost"
                        border="1px solid #D4BF90"
                        onClick={() => setStep(0)}
                     >
                        Voltar
                     </Button>

                     <Button
                        as={motion.button}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        bgColor="#D4BF90"
                        _hover={{ bgColor: '#d4be90e2' }}
                        color="white"
                        // onClick={() => setStep(0)}
                     >
                        Acessar
                     </Button>
                  </Box>
               </Box>
            )}
         </Box>
      </Box>
   )
}
