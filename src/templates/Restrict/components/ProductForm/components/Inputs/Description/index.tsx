import { FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import { FormProps } from '../../../models'

export const Description = ({ form }: FormProps) => {
   const { register } = form

   return (
      <FormControl>
         <FormLabel>
            Descrição <span style={{ color: '#b6b6b6' }}>(opcional)</span>
         </FormLabel>
         <Textarea bgColor="#F1F1F1" size="lg" {...register('description', { required: true })} />
      </FormControl>
   )
}
