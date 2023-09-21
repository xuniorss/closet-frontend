import { ErrorMessage } from '@/components/FormErrorMessage'
import { useStore } from '@/components/useStore'
import { SizePropsRequest } from '@/models/sizes'
import { sizeApi } from '@/services/apis'
import { useAuthStore } from '@/store/auth'
import { Checkbox, CheckboxGroup, FormControl, FormLabel, Stack, Tooltip } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import { FormProps } from '../../../models'

type SSizesProps = {
   errors: string | undefined
} & FormProps

export const SSizes = ({ form, errors }: SSizesProps) => {
   const store = useStore(useAuthStore, (state) => state)
   const { register } = form

   const { data: dataSizes } = useQuery<SizePropsRequest[]>({
      queryKey: process.env.NEXT_PUBLIC_ALL_SIZES,
      queryFn: () => sizeApi.index(),
      enabled: !!store?.authAdmin,
   })

   return (
      <FormControl isInvalid={!!errors}>
         <FormLabel>Tamanhos</FormLabel>
         <Stack spacing={[1, 5]} direction={['column', 'row']}>
            <CheckboxGroup>
               {dataSizes &&
                  dataSizes.map((value) => (
                     <Checkbox
                        key={value.id}
                        size="lg"
                        value={value.id}
                        bgColor="#F1F1F1"
                        colorScheme="orange"
                        {...register('size', { required: true })}
                     >
                        <Tooltip label={(value.description && value.description) || value.size}>
                           {value.size}
                        </Tooltip>
                     </Checkbox>
                  ))}
            </CheckboxGroup>
         </Stack>
         {errors && <ErrorMessage message={errors} />}
      </FormControl>
   )
}
