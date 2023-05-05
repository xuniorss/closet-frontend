import { productsApi } from '@/services/apis'
import { queryClient } from '@/services/queryClient'
import {
   AlertDialog,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogOverlay,
   Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import { useMutation } from 'react-query'

type SaledProductsProps = {
   productid: string
   isOpenSaled: boolean
   onCloseSaled: () => void
}

export const SaledProducts = ({ productid, isOpenSaled, onCloseSaled }: SaledProductsProps) => {
   const cancelRef = useRef(null)
   const [saling, setSaling] = useState(false)

   const router = useRouter()

   const { mutate } = useMutation(() => productsApi.list(), {
      onSuccess: () => {
         queryClient.invalidateQueries(process.env.NEXT_PUBLIC_ALL_PRODUCTS)
      },
   })

   const handleSaled = useCallback(async () => {
      try {
         setSaling(true)
         await productsApi.saleProduct(productid)
         setSaling(false)

         mutate()
         onCloseSaled()

         router.push('/')
      } catch (error) {
         console.error(error)
      }
   }, [productid, onCloseSaled, mutate, router])

   const handleCancel = useCallback(() => {
      onCloseSaled()
   }, [onCloseSaled])

   return (
      <AlertDialog isOpen={isOpenSaled} leastDestructiveRef={cancelRef} onClose={onCloseSaled}>
         <AlertDialogOverlay>
            <AlertDialogContent bgColor="modal.bg">
               <AlertDialogHeader fontSize="lg" fontWeight="bold" color="white">
                  Esta mercadoria foi vendida ?
               </AlertDialogHeader>

               <AlertDialogFooter>
                  <Button ref={cancelRef} colorScheme="red" onClick={handleCancel}>
                     Cancelar
                  </Button>
                  <Button
                     colorScheme="green"
                     isLoading={saling}
                     onClick={handleSaled}
                     ml={3}
                     loadingText="Removendo"
                  >
                     Vendida
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialogOverlay>
      </AlertDialog>
   )
}
