import {
   Box,
   Button,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Text,
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'

type OthersValuesProps = {
   price: string
   isOpenCalc: boolean
   onCloseCalc: () => void
}

export const OthersValues = ({ price, isOpenCalc, onCloseCalc }: OthersValuesProps) => {
   const [debit, setDebit] = useState(0)
   const [creditVista, setCreditVista] = useState(0)
   const [creditParcel, setCreditParcel] = useState(0)

   const handleCalc = useCallback(() => {
      const pricenumber = Number(price)

      if (pricenumber <= 0) return

      const interest = 1.99 / 100
      const total = pricenumber + pricenumber * interest
      const roundedTotal = Math.ceil(total)
      setDebit(roundedTotal)

      const interestCreditVista = 4.99 / 100
      const totalCreditVista = pricenumber + pricenumber * interestCreditVista
      const roundedTotalCreditVista = Math.ceil(totalCreditVista)
      setCreditVista(roundedTotalCreditVista)

      const interestCreditParcel = 5.59 / 100
      const totalCreditParcel = pricenumber + pricenumber * interestCreditParcel
      const roundedTotalCreditParcel = Math.ceil(totalCreditParcel)
      setCreditParcel(roundedTotalCreditParcel)
   }, [price])

   useEffect(() => {
      handleCalc()
   }, [handleCalc, isOpenCalc])

   return (
      <Modal isOpen={isOpenCalc} onClose={onCloseCalc}>
         <ModalOverlay />
         <ModalContent bgColor="modal.bg">
            <ModalHeader color="white">Maquininha Pag Bank</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <Box color="red">
                  <Text>
                     <span style={{ fontWeight: 'bold' }}>DÉBITO NA HORA</span> (1,99%): R$ {debit}
                  </Text>
                  <Text>
                     <span style={{ fontWeight: 'bold' }}>CRÉDITO NA HORA À VISTA</span> (4,99%): R${' '}
                     {creditVista}
                  </Text>
                  <Text>
                     <span style={{ fontWeight: 'bold' }}>CRÉDITO NA HORA PARCELADO</span> (5,59%):
                     R$ {creditParcel}
                  </Text>
               </Box>
            </ModalBody>

            <ModalFooter>
               <Button colorScheme="blue" mr={3} onClick={onCloseCalc}>
                  Fechar
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   )
}
