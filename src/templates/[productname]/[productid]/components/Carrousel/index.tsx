import { useSmallScreen } from '@/hooks/useSmallScreen'
import { ProductImageProps } from '@/models/products'
import { Box, Image } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

type Images = {
   productImage: ProductImageProps[]
}

export const Carousel = ({ productImage }: Images) => {
   const [selectedImage, setSelectedImage] = useState(productImage[0].image_url)
   const smallScreen = useSmallScreen()

   const settings = {
      dots: !smallScreen,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      vertical: smallScreen,
      verticalSwiping: !smallScreen,
   }

   const handleImageClick = useCallback((imageurl: string) => {
      setSelectedImage(imageurl)
   }, [])

   return (
      <Box display="flex" h="inherit">
         <Box w={!smallScreen ? '15%' : '0'}>
            <Slider {...settings}>
               {!smallScreen && (
                  <Box>
                     {productImage.map((image) => (
                        <Box
                           key={image.id}
                           display="flex"
                           flexDir="column"
                           alignItems="center"
                           onClick={() => handleImageClick(image.image_url)}
                        >
                           <Image
                              src={image.image_url}
                              cursor="pointer"
                              w="60px"
                              h="65px"
                              border={
                                 selectedImage === image.image_url
                                    ? '2px solid #f3dba6'
                                    : '2px solid transparent'
                              }
                              borderRadius="5px"
                              m="5px"
                              transition="all .2s ease-in-out"
                              _hover={{ border: '2px solid #D4BF90' }}
                              alt={`${image.image_url}-image`}
                           />
                        </Box>
                     ))}
                  </Box>
               )}
            </Slider>
         </Box>
         <Box w="100%" h="inherit" bgColor="#f7f7f7">
            <Image src={selectedImage} objectFit="contain" h="100%" w="100%" alt={`image`} />
         </Box>
      </Box>
   )
}
