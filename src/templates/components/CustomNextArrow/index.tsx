import { Box, BoxProps } from '@chakra-ui/react'

interface ArrowProps extends BoxProps {
   onClick?: () => void
   currentSlide?: number
   slideCount?: number
}

export const CustomNextArrow = ({
   onClick,
   currentSlide = 1,
   slideCount = 1,
   ...rest
}: ArrowProps) => (
   <Box
      as="button"
      onClick={onClick}
      {...rest}
      className={
         'slick-next slick-arrow' + (currentSlide === slideCount - 1 ? ' slick-disabled' : '')
      }
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      aria-hidden="true"
      css={{
         '&::before': {
            content: "'\\2192'", // código unicode para o ícone de seta para direita
            color: 'black', // cor personalizada
            fontSize: '24px',
            backgroundColor: 'black',
         },
      }}
   />
)
