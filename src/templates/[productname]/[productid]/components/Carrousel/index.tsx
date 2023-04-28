import { useSmallScreen } from '@/hooks/useSmallScreen'
import { Box, Image } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

export const Carousel = ({ urlImage }: { urlImage: string }) => {
   const [selectedImage, setSelectedImage] = useState(urlImage)
   const smallScreen = useSmallScreen()

   const settings = {
      dots: !smallScreen,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      vertical: !smallScreen,
      verticalSwiping: !smallScreen,
   }

   const handleImageClick = useCallback((image: string) => {
      setSelectedImage(image)
   }, [])

   return (
      <Box display="flex" h="inherit">
         <Box w={!smallScreen ? '15%' : '0'}>
            <Slider {...settings}>
               {!smallScreen && (
                  <Box
                     display="flex"
                     flexDir="column"
                     alignItems="center"
                     onClick={() => handleImageClick(urlImage)}
                  >
                     <Image
                        src={urlImage}
                        cursor="pointer"
                        w="60px"
                        h="65px"
                        border={
                           selectedImage === urlImage
                              ? '2px solid #f3dba6'
                              : '2px solid transparent'
                        }
                        borderRadius="5px"
                        m="5px"
                        transition="all .2s ease-in-out"
                        _hover={{ border: '2px solid #D4BF90' }}
                        alt={`${urlImage}-image`}
                     />
                  </Box>
               )}
            </Slider>
         </Box>
         <Box w="100%" h="inherit" bgColor="#f0f0f0">
            <Image
               src={selectedImage}
               objectFit="contain"
               h="100%"
               w="100%"
               alt={`${urlImage}-image`}
            />
         </Box>
      </Box>
   )
}
