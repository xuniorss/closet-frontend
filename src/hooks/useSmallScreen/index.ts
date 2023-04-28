import { useMediaQuery } from '@chakra-ui/react'

export const useSmallScreen = () => {
   const [smallScreen] = useMediaQuery('(max-width: 1250px)')
   return smallScreen
}
