'use client'

import { useSmallScreen } from '@/hooks/useSmallScreen'
import { Products } from '@/models/products'
import { Box, Text } from '@chakra-ui/react'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { CardProducts } from '../Catalog/components/ProductsList/components/CardProducts'

type DataProps = {
   productsToday?: Array<Products>
   productsWeek?: Array<Products>
}

export default function HomeTemplate({ productsToday, productsWeek }: DataProps) {
   const smallScreen = useSmallScreen()

   const settings = {
      centerMode: !smallScreen,
      dots: smallScreen,
      centerPadding: '110px',
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      initialSlide: 0,
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
            },
         },
      ],
   }

   return (
      <Box display="flex" flexDir="column">
         <Box mt="2.5rem">
            {productsToday && productsToday.length > 0 && (
               <Box mb="1rem">
                  <Text
                     textAlign="center"
                     mb="1.5rem"
                     fontSize="1.5rem"
                     lineHeight="2.25rem"
                     fontWeight="normal"
                  >
                     ACABARAM DE CHEGAR
                  </Text>

                  <Slider {...settings}>
                     {productsToday.map((value) => (
                        <Box key={value.id}>
                           <CardProducts value={value} />
                        </Box>
                     ))}
                  </Slider>
               </Box>
            )}

            {productsWeek && productsWeek.length > 0 && (
               <Box mb="1rem">
                  <Text
                     textAlign="center"
                     mb="1.5rem"
                     fontSize="1.5rem"
                     lineHeight="2.25rem"
                     fontWeight="normal"
                  >
                     NOVIDADES DA SEMANA
                  </Text>

                  <Slider {...settings}>
                     {productsWeek.map((value) => (
                        <Box key={value.id}>
                           <CardProducts value={value} />
                        </Box>
                     ))}
                  </Slider>
               </Box>
            )}
         </Box>
      </Box>
   )
}
