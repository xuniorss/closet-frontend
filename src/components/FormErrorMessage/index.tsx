import { FormErrorMessage } from '@chakra-ui/react'

export const ErrorMessage = ({ message = undefined }: { message: string | undefined }) => {
   return <FormErrorMessage color="red.500">{message !== undefined && message}</FormErrorMessage>
}
