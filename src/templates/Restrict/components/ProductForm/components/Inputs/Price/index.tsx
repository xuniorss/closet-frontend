import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import CurrencyInput from 'react-currency-input-field'

import { FormProps } from '../../../models'

export const Price = ({ form }: FormProps) => {
   const { register } = form

   return (
      <FormControl>
         <FormLabel>Valor</FormLabel>
         <Input
            as={CurrencyInput}
            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
            decimalScale={2}
            fixedDecimalLength={2}
            decimalSeparator=","
            groupSeparator="."
            placeholder="R$ 0,00"
            prefix="R$"
            allowNegativeValue={false}
            bgColor="#F1F1F1"
            size="lg"
            type="text"
            _placeholder={{ bgColor: '#F1F1F1', color: '#cfcfcf' }}
            {...register('price', { required: true })}
         />
      </FormControl>
   )
}
