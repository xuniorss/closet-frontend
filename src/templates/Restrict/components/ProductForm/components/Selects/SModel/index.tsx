import { ErrorMessage } from '@/components/FormErrorMessage'
import { useRestrictArea } from '@/templates/Restrict/hooks/useRestrictArea'
import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

import { ControlProps } from '../../../models'

type SModelProps = {
   errors: string | undefined
} & ControlProps

export const SModel = ({ control, errors }: SModelProps) => {
   const { modelList } = useRestrictArea()

   return (
      <FormControl>
         <FormLabel>Modelo</FormLabel>
         <Controller
            control={control}
            name="model_id"
            render={({ field }) => (
               <Select
                  placeholder="Escolha o modelo"
                  _placeholder={{ bgColor: '#F1F1F1', color: '#cfcfcf' }}
                  bgColor="#F1F1F1"
                  size="lg"
                  isInvalid={!!errors}
                  {...field}
               >
                  {modelList &&
                     modelList.map((value) => (
                        <option
                           style={{ backgroundColor: '#F1F1F1' }}
                           key={value.id}
                           value={value.id}
                        >
                           {value.model_name}
                        </option>
                     ))}
               </Select>
            )}
         />
         {errors && <ErrorMessage message={errors} />}
      </FormControl>
   )
}
