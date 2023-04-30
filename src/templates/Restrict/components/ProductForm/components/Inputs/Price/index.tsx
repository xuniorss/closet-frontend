import { ErrorMessage } from '@/components/FormErrorMessage'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { Controller } from 'react-hook-form'

import { ControlProps } from '../../../models'

//REFERENCE = https://github.com/ElderLK/input-currency-react
//dynamic = https://github.com/vercel/next.js/issues/4515

const CurrencyInput = dynamic(
   () => import('input-currency-react').then((curr) => curr.CurrencyInput),
   { ssr: false }
)

type PriceProps = {
   errors: string | undefined
} & ControlProps

export const Price = ({ control, errors }: PriceProps) => {
   return (
      <FormControl isInvalid={!!errors}>
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
         {errors && <ErrorMessage message={errors} />}
      </FormControl>
   )
}
