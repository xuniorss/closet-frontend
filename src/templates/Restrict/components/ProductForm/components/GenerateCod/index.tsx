import { useRestrictArea } from '@/templates/Restrict/hooks/useRestrictArea'
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { UseFormRegister } from 'react-hook-form'
import { ProductsProps } from '../../../NewCategory/validator'

type RegisterProps = {
   register: UseFormRegister<ProductsProps>
}

export type FormProps = {
   form: RegisterProps
   handleGenereteRandomId: () => void
}

export const GenerateCod = ({ form, handleGenereteRandomId }: FormProps) => {
   const { register } = form

   return (
      <FormControl>
         <FormLabel>Gerar código da mercadoria</FormLabel>
         <Box display="flex" alignItems="center" justifyContent="center" gap={3}>
            <Input
               bgColor="#F1F1F1"
               color="black"
               readOnly
               {...register('product_code', { required: true })}
            />
            <Button
               color="white"
               type="button"
               cursor="pointer"
               bgColor="blue.700"
               _hover={{ bgColor: 'blue.900' }}
               onClick={handleGenereteRandomId}
            >
               Gerar
            </Button>
         </Box>
      </FormControl>
   )
}
