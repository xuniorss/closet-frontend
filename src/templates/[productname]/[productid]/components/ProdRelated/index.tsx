import { CardProducts } from '@/components/ProductsList/components/CardProducts'
import { useSmallScreen } from '@/hooks/useSmallScreen'
import { Products } from '@/models/products'
import { CustomNextArrow } from '@/templates/components/CustomNextArrow'
import { CustomPrevArrow } from '@/templates/components/CustomPrevArrow/inex'
import { Box, BoxProps, Text } from '@chakra-ui/react'
import { Fragment, useState } from 'react'
import Slider from 'react-slick'

interface ArrowProps extends BoxProps {
   onClick?: () => void
   currentSlide?: number
   slideCount?: number
}

export const ProdRelated = ({ prodRelated }: { prodRelated: Products[] }) => {
   const smallScreen = useSmallScreen()

   const settings = {
      centerMode: !smallScreen,
      dots: smallScreen,
      centerPadding: '120px',
      infinite: true,
      speed: 500,
      slidesToShow: smallScreen ? 1 : 3,
      slidesToScroll: 1,
      arrows: true,
      initialSlide: 0,
      adaptiveHeight: true,
      style: { margin: '0 50px' },

      responsive: [
         {
            breakpoint: 1000,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
            },
         },
         {
            breakpoint: 700,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               centerMode: true,
               centerPadding: '105px',
               style: { margin: '0 10px' },
               variableWidth: true,
            },
         },
         {
            breakpoint: 400,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               centerMode: true,
               centerPadding: '2px',
               style: { margin: '0 30px' },
               variableWidth: true,
            },
         },
      ],
   }

   return (
      <Fragment>
         {prodRelated && prodRelated.length > 0 && (
            <Box display="flex" w="100%" flexDir="column" mt={8}>
               <Text fontSize="xl" textAlign="center" textTransform="uppercase" fontWeight="medium">
                  Alguns outros produtos do modelo, que talvez possa te interessar
               </Text>

               <Box width="100%" display="flex" alignItems="center" justifyContent="center" p={3}>
                  <Box width="100%" margin="0 auto">
                     <Slider
                        {...settings}
                        nextArrow={<CustomNextArrow />}
                        prevArrow={<CustomPrevArrow />}
                     >
                        {prodRelated.map((value) => (
                           <Box key={value.id}>
                              <CardProducts value={value} />
                           </Box>
                        ))}
                     </Slider>
                  </Box>
               </Box>
            </Box>
         )}
      </Fragment>
   )
}
