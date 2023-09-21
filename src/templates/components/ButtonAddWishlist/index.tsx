import { useStore } from '@/components/useStore'
import { ProductImageProps, Products } from '@/models/products'
import { useProductsStore } from '@/store/products'
import { Badge } from '@chakra-ui/react'
import { useCallback } from 'react'
import { BsHeart } from 'react-icons/bs'

type ButtonWishProps = {
   product: Products
   productImage: ProductImageProps[]
}

export const ButtonAddWishlist = ({ product, productImage }: ButtonWishProps) => {
   const store = useStore(useProductsStore, (state) => state)

   const handleWished = useCallback(() => {
      if (!store) return

      store.addWishlist(product, productImage)
   }, [product, productImage, store])

   return (
      <Badge
         display="flex"
         alignItems="center"
         justifyContent="center"
         cursor="pointer"
         borderRadius="full"
         role="button"
         bgColor={
            store && store.wished.find((wi) => wi.id === product.id) ? '#ff6464cf' : 'transparent'
         }
         h="45px"
         w="45px"
         _hover={{ bgColor: '#ff6464cf' }}
         onClick={handleWished}
      >
         {
            <BsHeart
               size={25}
               color={store && store.wished.find((wi) => wi.id === product.id) ? 'red' : 'black'}
            />
         }
      </Badge>
   )
}
