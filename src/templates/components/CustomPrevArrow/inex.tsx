import { Box, BoxProps } from '@chakra-ui/react'

interface ArrowProps extends BoxProps {
   onClick?: () => void
   currentSlide?: number
   slideCount?: number
}

export const CustomPrevArrow = ({
   onClick,
   currentSlide = 0,
   slideCount = 0,
   ...rest
}: ArrowProps) => (
   <Box
      as="button"
      onClick={onClick}
      {...rest}
      className={'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')}
      aria-disabled={currentSlide === 0 ? true : false}
      aria-hidden="true"
      css={{
         '&::before': {
            content: "'\\2190'", // código unicode para o ícone de seta para esquerda
            color: 'black', // cor personalizada
            fontSize: '24px',
            backgroundColor: 'black',
         },
      }}
   />
)
