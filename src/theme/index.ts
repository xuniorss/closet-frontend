import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
   initialColorMode: 'light',
   useSystemColorMode: false,
}

const colors = {
   main: {
      500: '#D4BF90',
      hover: '#bba880',
   },
   white: {
      500: '#F6f6f6',
      550: '#f1f1f1',
      600: '#e9e9e9',
   },
   gray: {
      500: '#c2c2c2',
      550: '#b9b9b9',
      700: '#949494',
   },
   green: {
      whatsapp: '#3BCD41',
      hover: '#008844',
   },
   placeholder: {
      500: '#c9c8c8',
   },
   card: {
      bg: '#CCCCCC',
      color: '#464646',
   },
   title: {
      500: '#261E1E',
   },
}

export const theme = extendTheme({ config, colors })
