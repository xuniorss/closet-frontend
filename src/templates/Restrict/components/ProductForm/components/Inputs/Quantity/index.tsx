import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { FormProps } from '../../../models'

export const Quantity = ({ form }: FormProps) => {
   const { register } = form

   return (
      <FormControl>
         <FormLabel>Quantidade</FormLabel>
         <Input
            bgColor="#F1F1F1"
            size="lg"
            type="number"
            {...register('quantity', { required: true, valueAsNumber: true })}
         />
      </FormControl>
   )
}
