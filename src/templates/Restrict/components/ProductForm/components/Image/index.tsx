import { useRestrictArea } from '@/templates/Restrict/hooks/useRestrictArea'
import { Box, FormLabel, HStack, Image, Input, Tag } from '@chakra-ui/react'

export const ChooseImage = () => {
   const { mediaUrl, id, handleRemoveMedia, handleMediaChange } = useRestrictArea()

   return (
      <Box>
         <HStack>
            {!mediaUrl && (
               <FormLabel textAlign="center" cursor="pointer" htmlFor={`${id}-prodctimage`}>
                  Selecionar a imagem
               </FormLabel>
            )}

            {mediaUrl && (
               <Tag
                  onClick={handleRemoveMedia}
                  mb={3}
                  bgColor="red.500"
                  cursor="pointer"
                  role="button"
               >
                  Remover imagem
               </Tag>
            )}
         </HStack>

         <Input
            id={`${id}-prodctimage`}
            type="file"
            accept="image/png, image/jpeg"
            display="none"
            onChange={handleMediaChange}
         />

         {mediaUrl && (
            <Image
               src={mediaUrl}
               objectFit="cover"
               bgColor="gray.200"
               w="21rem"
               h="21rem"
               alt="image"
            />
         )}
      </Box>
   )
}
