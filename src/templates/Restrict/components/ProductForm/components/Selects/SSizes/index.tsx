import { sizes } from '@/templates/Restrict/constants/sizes'
import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

import { ControlProps } from '../../../models'

export const SSizes = ({ control }: ControlProps) => {
   return (
      <FormControl>
         <FormLabel>Tamanho</FormLabel>
         <Controller
            control={control}
            name="size"
            render={({ field }) => (
               <Select placeholder="Escolha o tamanho" bgColor="#F1F1F1" size="lg" {...field}>
                  {sizes.map((value) => (
                     <option
                        style={{ backgroundColor: '#F1F1F1' }}
                        key={value.size}
                        value={value.size}
                     >
                        {value.size.toUpperCase()}
                     </option>
                  ))}
               </Select>
            )}
         />
      </FormControl>
   )
}
