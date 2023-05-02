import { CardProducts } from '@/components/ProductsList/components/CardProducts'
import { useSmallScreen } from '@/hooks/useSmallScreen'
import { Products } from '@/models/products'
import { Box, Text } from '@chakra-ui/react'
import { Fragment } from 'react'

export const ProdNoRelated = ({ prodNoRelated }: { prodNoRelated: Products[] }) => {
   const smallScreen = useSmallScreen()

   return (
      <Fragment>
         {prodNoRelated && prodNoRelated.length > 0 && (
            <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" mt={8}>
               <Text fontSize="xl" textAlign="center" textTransform="uppercase" fontWeight="medium">
                  Top 3 outros modelos que também podem ser do seu interesse
               </Text>

               <Box
                  display="flex"
                  flexDir={smallScreen ? 'column' : 'row'}
                  gap={4}
                  flexWrap="wrap"
                  mt={5}
               >
                  {prodNoRelated.map((value) => (
                     <CardProducts key={value.id} value={value} />
                  ))}
               </Box>
            </Box>
         )}
      </Fragment>
   )
}
