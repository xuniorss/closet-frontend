import { productsApi } from '@/services/apis'
import { removeImageProductStorage } from '@/services/firebase/requests/products'
import {
   AlertDialog,
   AlertDialogBody,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogOverlay,
   Button,
   Input,
   Text,
   useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import randomstring from 'randomstring'
import { useCallback, useEffect, useRef, useState } from 'react'

type RemoveProductsProps = {
   productid: string
   mediaId: string
   isOpenRemove: boolean
   onCloseRemove: () => void
}

export const RemoveProducts = ({
   productid,
   mediaId,
   isOpenRemove,
   onCloseRemove,
}: RemoveProductsProps) => {
   const [key, setKey] = useState('')
   const [randomKey, setRadomKey] = useState('')
   const [isRemoving, setIsRemoving] = useState(false)

   const cancelRef = useRef(null)

   const router = useRouter()

   const toast = useToast()

   useEffect(() => {
      const randomKey = randomstring.generate({
         length: 7,
         charset: 'alphabetic',
         capitalization: 'uppercase',
      })

      setRadomKey(randomKey)
   }, [isOpenRemove])

   const handleRemove = useCallback(async () => {
      if (!productid) return

      try {
         setIsRemoving(true)

         await new Promise((resolve) => setTimeout(resolve, 1000))

         await Promise.all([
            productsApi.deleteProduct(productid),
            removeImageProductStorage(mediaId),
         ])

         setIsRemoving(false)
         onCloseRemove()
         setKey('')
         setRadomKey('')

         toast({
            title: 'Mercadoria removida.',
            description: 'Removemos essa mercadoria para você.',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top',
         })

         router.push('/')
      } catch (error) {
         toast({
            title: 'Mercadoria não removida.',
            description: 'Não foi possível remover esta mercadoria.',
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: 'top',
         })
         console.error(error)
      }
   }, [mediaId, onCloseRemove, productid, router, toast])

   const handleCancel = useCallback(() => {
      onCloseRemove()
      setKey('')
   }, [onCloseRemove])

   return (
      <AlertDialog isOpen={isOpenRemove} leastDestructiveRef={cancelRef} onClose={onCloseRemove}>
         <AlertDialogOverlay>
            <AlertDialogContent bgColor="modal.bg">
               <AlertDialogHeader fontSize="lg" fontWeight="bold" color="white">
                  Remover esta mercadoria
               </AlertDialogHeader>

               <AlertDialogBody color="white" textAlign="center">
                  <Text>
                     Se você tiver certeza que deseja remover o item, digite a chave{' '}
                     <span style={{ color: 'red', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        {randomKey}
                     </span>{' '}
                     abaixo
                  </Text>
                  <Input
                     mt={5}
                     placeholder="Insira a chave de segurança"
                     _placeholder={{ textTransform: 'lowercase' }}
                     textTransform="uppercase"
                     value={key}
                     onChange={(e) => setKey(e.target.value)}
                     maxLength={7}
                  />
               </AlertDialogBody>

               <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={handleCancel}>
                     Cancelar
                  </Button>
                  <Button
                     colorScheme="red"
                     onClick={handleRemove}
                     ml={3}
                     isDisabled={key.toUpperCase() !== randomKey}
                     loadingText="Removendo"
                     isLoading={isRemoving}
                  >
                     Remover
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialogOverlay>
      </AlertDialog>
   )
}
