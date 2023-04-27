import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { CurrencyInput } from 'input-currency-react'
import { Controller } from 'react-hook-form'

import { ControlProps } from '../../../models'

//REFERENCE = https://github.com/ElderLK/input-currency-react

export const Price = ({ control }: ControlProps) => {
   return (
      <FormControl>
         <FormLabel>
            Valor <span style={{ color: '#cfcfcf' }}>(R$)</span>
         </FormLabel>
         <Controller
            control={control}
            name="price"
            defaultValue="0,00"
            render={({ field: { value, onChange } }) => (
               <Input
                  as={CurrencyInput}
                  options={{ style: 'decimal', allowNegative: false }}
                  bgColor="#F1F1F1"
                  size="lg"
                  type="text"
                  value={value}
                  onChangeEvent={(_: EventTarget & HTMLInputElement, maskedValue: string) => {
                     onChange(maskedValue)
                  }}
                  required={true}
                  style={{ textAlign: 'left' }}
                  _placeholder={{ bgColor: '#F1F1F1', color: '#cfcfcf' }}
               />
            )}
         />
      </FormControl>
   )
}
