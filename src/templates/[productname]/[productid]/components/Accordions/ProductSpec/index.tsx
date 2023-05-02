import { ProductsSpecificationProps } from '@/models/products'
import {
   Accordion,
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel,
   Box,
   Text,
} from '@chakra-ui/react'
import { Fragment } from 'react'

export const ProductSpec = ({ productSpec }: { productSpec: ProductsSpecificationProps }) => {
   return (
      <Fragment>
         {productSpec && (
            <Accordion allowToggle>
               <AccordionItem>
                  <h2>
                     <AccordionButton>
                        <Box as="span" flex="1" textAlign="left" fontWeight="bold">
                           Especificações do produtos
                        </Box>
                        <AccordionIcon />
                     </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                     {productSpec.composition?.length > 0 && (
                        <Text color="#949494">
                           Composição Principal:{' '}
                           <span style={{ color: 'black' }}>{productSpec.composition}</span>
                        </Text>
                     )}
                     <Text color="#949494">
                        Código Genérico:{' '}
                        <span style={{ color: 'black' }}>{productSpec.generic_code}</span>
                     </Text>
                  </AccordionPanel>
               </AccordionItem>
            </Accordion>
         )}
      </Fragment>
   )
}
