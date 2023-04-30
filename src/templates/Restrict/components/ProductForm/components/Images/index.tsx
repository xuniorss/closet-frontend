import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

type Props = {
   onUpload: (files: File[]) => void
}

export const ImagesUpload = ({ onUpload }: Props) => {
   const [files, setFiles] = useState<File[]>([])

   const handleDrop = useCallback(
      (acceptedFiles: File[]) => {
         setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
         onUpload(acceptedFiles)
      },
      [onUpload]
   )

   const { getRootProps, getInputProps } = useDropzone({
      onDrop: handleDrop,
      accept: {
         'image/*': [],
      },
      multiple: true,
      maxFiles: 5,
      maxSize: 2 * 1024 * 1024, // 2 MB
   })

   const removeFile = useCallback(
      (fileToRemove: File) => {
         setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove))
         onUpload(files.filter((file) => file !== fileToRemove))
      },
      [files, onUpload]
   )

   const formatBytes = (size: number) => {
      const units = ['B', 'KB', 'MB', 'GB', 'TB']

      let i = 0
      while (size >= 1024 && i < units.length - 1) {
         size /= 1024
         i++
      }

      return `${Math.round(size * 100) / 100} ${units[i]}`
   }

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
               <Box key={file.name}>
                  <Text>{file.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                     {formatBytes(file.size)}
                  </Text>
                  <Button size="sm" onClick={() => removeFile(file)} mt={2}>
                     Remover
                  </Button>
               </Box>
            ))}
         </Stack>
      </Box>
   )
}
