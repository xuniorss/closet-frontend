import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
   initialColorMode: 'light',
   useSystemColorMode: false,
}

const colors = {
   closet: {
      500: '#D4BF90',
   },
}

export const theme = extendTheme({ config, colors })
