import { Box, Button, Image, Stack, Text } from '@chakra-ui/react'

import { useImagesUpload } from './hook/useImagesUpload'

export const ImagesUpload = () => {
   const { getRootProps, getInputProps, files, formatBytes, removeFile } = useImagesUpload()

   return (
      <Box
         p={6}
         borderWidth={2}
         borderColor="gray.300"
         borderStyle="dashed"
         rounded="md"
         {...getRootProps()}
         cursor="pointer"
      >
         <input {...getInputProps()} />
         <Text>Arraste e solte arquivos aqui, ou clique para selecionar arquivos</Text>
         <Text fontSize="sm" mt={2}>
            Aceitamos apenas 5 imagens (jpg, png) de até 2MB cada.
         </Text>
         <Stack mt={4} spacing={2}>
            {files.map((file) => (
               <Box
                  key={file.name}
                  display="flex"
                  flexDir="row"
                  alignItems="center"
                  justifyContent="space-between"
               >
                  <Box display="flex" flexDir="row" gap={3} alignItems="center">
                     <Box w="5rem" h="5rem">
                        <Image
                           objectFit="cover"
                           w="100%"
                           h="100%"
                           alt="image-preview"
                           src={URL.createObjectURL(file)}
                        />
                     </Box>
                     <Text>{file.name}</Text>
                     <Text fontSize="sm" color="gray.500">
                        {formatBytes(file.size)}
                     </Text>
                  </Box>
                  <Button colorScheme="red" size="sm" onClick={() => removeFile(file)} mt={2}>
                     Remover
                  </Button>
               </Box>
            ))}
         </Stack>
      </Box>
   )
}
