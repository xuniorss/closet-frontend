'use client'

import { useSmallScreen } from '@/hooks/useSmallScreen'
import { ModelsPropsList } from '@/models/modelApi'
import { Products } from '@/models/products'
import { Box, Text } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { CardProducts } from '../../components/ProductsList/components/CardProducts'
import { CustomNextArrow } from '../components/CustomNextArrow'
import { CustomPrevArrow } from '../components/CustomPrevArrow/inex'

type DataProps = {
   productsWeek?: Array<Products>
}

export default function HomeTemplate({ productsWeek }: DataProps) {
   const smallScreen = useSmallScreen()

   const settings = {
      centerMode: !smallScreen,
      dots: false,
      centerPadding: '110px',
      infinite: true,
      speed: 500,
      slidesToShow: (productsWeek && productsWeek.length < 3 && productsWeek.length) || 3,
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

   // const { data } = useQuery<ModelsPropsList[]>({

   // })

   return (
      <Box display="flex" flexDir="column" minH="calc(100vh - 15rem)">
         <Box mt="3.5rem">
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

                  <Slider
                     {...settings}
                     nextArrow={<CustomNextArrow />}
                     prevArrow={<CustomPrevArrow />}
                  >
                     {productsWeek.map((value) => (
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
                     textTransform="uppercase"
                  >
                     Coleção T-shirts
                  </Text>

                  <Slider
                     {...settings}
                     nextArrow={<CustomNextArrow />}
                     prevArrow={<CustomPrevArrow />}
                  >
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
