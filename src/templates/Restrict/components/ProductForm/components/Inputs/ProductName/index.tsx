import { ErrorMessage } from '@/components/FormErrorMessage'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

import { FormProps } from '../../../models'

type ProductNameProps = {
   errors: string | undefined
} & FormProps

export const ProductName = ({ form, errors }: ProductNameProps) => {
   const { register } = form

   return (
      <FormControl isInvalid={!!errors}>
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
         {errors && <ErrorMessage message={errors} />}
      </FormControl>
   )
}
