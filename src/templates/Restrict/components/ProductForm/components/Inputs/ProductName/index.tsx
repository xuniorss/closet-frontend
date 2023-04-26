import { ErrorMessage } from '@/components/FormErrorMessage'
import { useRestrictArea } from '@/templates/Restrict/hooks/useRestrictArea'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

import { FormProps } from '../../../models'

export const ProductName = ({ form }: FormProps) => {
   const { register } = form

   const { errors } = useRestrictArea()

   return (
      <FormControl isInvalid={!!errors.product_name}>
         <FormLabel>Nome da mercadoria</FormLabel>
         <Input
            bgColor="#F1F1F1"
            placeholder="Informe o nome da mercadoria"
            _placeholder={{ color: '#cfcfcf' }}
            size="lg"
            userSelect="none"
            autoComplete="off"
            {...register('product_name', { required: true })}
         />
         {errors.product_name && <ErrorMessage message={errors.product_name.message} />}
      </FormControl>
   )
}
