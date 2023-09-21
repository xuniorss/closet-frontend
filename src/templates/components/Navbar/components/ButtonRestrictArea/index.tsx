import { useSmallScreen } from '@/hooks/useSmallScreen'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

export const ButtonRestrictArea = () => {
   const smallScreen = useSmallScreen()

   return (
      <Link href="/restrict">
         <Button
            bgColor="main.500"
            _hover={{ bgColor: 'main.hover' }}
            p={4}
            w="auto"
            color="white"
            cursor="pointer"
         >
            {`${smallScreen ? 'Config.' : 'Área restrita'}`}
         </Button>
      </Link>
   )
}
