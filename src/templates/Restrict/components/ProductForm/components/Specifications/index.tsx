import {
   Accordion,
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel,
   Box,
   FormControl,
   FormLabel,
   Input,
} from '@chakra-ui/react'
import { FormProps } from '../../models'

export const Specifications = ({ form }: FormProps) => {
   const { register } = form

   return (
      <Accordion allowToggle>
         <AccordionItem>
            <h2>
               <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" fontSize="md" fontWeight="semibold">
                     Especificações dos produtos{' '}
                     <span style={{ color: '#b6b6b6' }}>(opcional)</span>
                  </Box>
                  <AccordionIcon />
               </AccordionButton>
            </h2>
            <AccordionPanel pb={4} display="flex" flexDir="column" gap={2}>
               <FormControl>
                  <FormLabel>Cor</FormLabel>
                  <Input
                     bgColor="transparent"
                     width="8rem"
                     borderRadius="lg"
                     size="lg"
                     type="color"
                     defaultValue="#000000"
                     {...register('color')}
                  />
               </FormControl>

               <FormControl>
                  <FormLabel>Composição Principal</FormLabel>
                  <Input
                     bgColor="#F1F1F1"
                     w="40%"
                     autoComplete="off"
                     size="lg"
                     {...register('composition')}
                  />
               </FormControl>
            </AccordionPanel>
         </AccordionItem>
      </Accordion>
   )
}
