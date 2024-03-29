import { useProductsContext } from '@/hooks/useProductsContext'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export const useImagesUpload = () => {
   const { filesSteate, files: filesContext } = useProductsContext()
   const [files, setFiles] = useState<File[]>([])

   useEffect(() => {
      if (filesContext?.length <= 0) {
         setFiles([])
         return
      }
   }, [filesContext?.length])

   const handleDrop = useCallback(
      (acceptedFiles: File[]) => {
         setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
         filesSteate(acceptedFiles)
      },
      [filesSteate]
   )

   const { getRootProps, getInputProps } = useDropzone({
      onDrop: handleDrop,
      accept: {
         'image/jpeg': [],
         'image/png': [],
      },
      multiple: true,
      maxFiles: 5,
      maxSize: 2 * 1024 * 1024, // 2 MB
      noKeyboard: true,
   })

   const removeFile = useCallback(
      (fileToRemove: File) => {
         setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove))
         filesSteate(files.filter((file) => file !== fileToRemove))
      },
      [files, filesSteate]
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

   useEffect(() => {
      return () => files.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)))
   }, [files])

   return { getRootProps, getInputProps, files, formatBytes, removeFile }
}
