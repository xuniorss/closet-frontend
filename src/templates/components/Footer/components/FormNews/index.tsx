import { useSmallScreen } from '@/hooks/useSmallScreen'
import { Badge, Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'

export const FormNews = () => {
   const smallScreen = useSmallScreen()

   return (
      <Box pos="relative">
         <FormControl
            display="flex"
            flexDir={smallScreen ? 'column' : 'row'}
            gap={5}
            alignItems="baseline"
         >
            <FormLabel fontWeight="normal" fontSize="sm" textTransform="uppercase">
               Receba novidades por seu e-mail
            </FormLabel>
            <Input
               type="email"
               fontStyle="italic"
               placeholder="Digite aqui seu e-mail"
               _placeholder={{ color: 'placeholder.500' }}
               variant="flushed"
               autoComplete="off"
               w="20rem"
            />
            <Button
               textTransform="uppercase"
               color="white"
               fontSize="sm"
               bgColor="main.500"
               w={smallScreen ? '100%' : 'auto'}
               isDisabled
               cursor="pointer"
               _hover={{ bgColor: 'main.hover' }}
            >
               Cadastrar
            </Button>
            <Badge
               colorScheme="purple"
               pos={smallScreen ? 'absolute' : 'relative'}
               top={0}
               right={0}
            >
               Em breve
            </Badge>
         </FormControl>
      </Box>
   )
}
