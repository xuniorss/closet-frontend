import { Products } from '@/models/products'
import {
   Accordion,
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel,
   Box,
} from '@chakra-ui/react'
import { Fragment } from 'react'

export const Description = ({ product }: { product: Products }) => {
   return (
      <Fragment>
         {product.description && (
            <Accordion allowToggle>
               <AccordionItem>
                  <h2>
                     <AccordionButton>
                        <Box as="span" flex="1" textAlign="left" fontWeight="bold">
                           Descrição
                        </Box>
                        <AccordionIcon />
                     </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>{product.description}</AccordionPanel>
               </AccordionItem>
            </Accordion>
         )}
      </Fragment>
   )
}
