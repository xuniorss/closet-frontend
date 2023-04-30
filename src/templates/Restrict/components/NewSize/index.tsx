import {
   Box,
   Button,
   Drawer,
   DrawerBody,
   DrawerCloseButton,
   DrawerContent,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   FormLabel,
   Input,
   Stack,
   Textarea,
} from '@chakra-ui/react'
import { useNewSize } from './hook/useNewSize'

type NewSizeProps = {
   isOpen: boolean
   onClose: () => void
}

export const NewSize = ({ isOpen, onClose }: NewSizeProps) => {
   const { handleSubmit, handleCancel, watch, register, onSubmit, id, isSubmitting } = useNewSize({
      onClose: onClose,
   })

   return (
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
         <DrawerOverlay />
         <DrawerContent bgColor="whitesmoke">
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Cadastrar Novo Tamanho</DrawerHeader>

            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
               <DrawerBody>
                  <Stack spacing="24px">
                     <Box>
                        <FormLabel htmlFor={`${id}-size`}>
                           Tamanho ({watch('size')?.length ?? 0}/5)
                        </FormLabel>
                        <Input
                           bgColor="gray.200"
                           id={`${id}-size`}
                           _placeholder={{ color: '#b6b6b6' }}
                           color="black"
                           placeholder="Informe o tamanho"
                           autoComplete="off"
                           maxLength={5}
                           {...register('size', { required: true })}
                        />
                     </Box>

                     <Box>
                        <FormLabel htmlFor={`${id}-desc`}>
                           Descrição ({watch('description')?.length ?? 0}/100){' '}
                           <span style={{ color: '#b6b6b6' }}>(opcional)</span>
                        </FormLabel>
                        <Textarea
                           id={`${id}-desc`}
                           bgColor="gray.200"
                           {...register('description')}
                           maxLength={200}
                        />
                     </Box>
                  </Stack>
               </DrawerBody>

               <DrawerFooter borderTopWidth="1px">
                  <Button
                     type="button"
                     variant="outline"
                     colorScheme="red"
                     mr={3}
                     onClick={handleCancel}
                  >
                     Cancelar
                  </Button>
                  <Button type="submit" colorScheme="green" isLoading={isSubmitting}>
                     Cadastrar
                  </Button>
               </DrawerFooter>
            </Box>
         </DrawerContent>
      </Drawer>
   )
}
