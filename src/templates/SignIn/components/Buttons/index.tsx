import { Button, ButtonProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'

type ButtonsProps = {
   btnSubmit?: boolean
   isBack?: boolean
   isDisabled?: boolean
   label: string
   onClick?: () => void
   isLoading?: boolean
}

export const Buttons = ({
   btnSubmit = false,
   isBack = false,
   isDisabled = false,
   isLoading = false,
   label = '',
   onClick,
}: ButtonsProps) => {
   return (
      <Button
         as={motion.button}
         whileHover={{ scale: 1.2 }}
         whileTap={{ scale: 0.9 }}
         bgColor={!isBack ? '#D4BF90' : 'white'}
         color={isBack ? '#D4BF90' : 'white'}
         variant={isBack ? 'ghost' : 'solid'}
         border={isBack ? '1px solid #D4BF90' : ''}
         type={btnSubmit ? 'submit' : 'button'}
         _hover={{ bgColor: `${isBack ? '' : '#d4be90e2'}` }}
         onClick={onClick}
         isDisabled={isDisabled}
         isLoading={isLoading}
      >
         {label}
      </Button>
   )
}
