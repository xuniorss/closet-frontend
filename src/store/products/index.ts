import { ProductImageProps, Products, StorageProps } from '@/models/products'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { useAuthStore } from '../auth'

type StateProps = {
   wished: StorageProps[]
}

type ActionsProps = {
   addWishlist: (product: Products, productImage: ProductImageProps[]) => void
}

const key = `${process.env.NEXT_PUBLIC_WISHLIST}`

export const useProductsStore = create<StateProps & ActionsProps>()(
   devtools(
      persist(
         (set) => ({
            wished: [],

            addWishlist: (product, productImage) => {
               const { isAuthenticated } = useAuthStore.getState()

               if (!isAuthenticated) return

               const dataToSave: StorageProps = {
                  ...product,
                  productImage,
               }

               const getItemStorage = JSON.parse(
                  localStorage.getItem(key) || '[]'
               ) as StorageProps[]

               const verify = getItemStorage.some((item) => item.id === product.id)

               if (!verify) {
                  const data = [...getItemStorage, dataToSave]
                  localStorage.setItem(key, JSON.stringify(data))
                  set({ wished: data })

                  return
               }

               const idx = getItemStorage.findIndex((idxItem) => idxItem.id === product.id)
               const removed = getItemStorage.splice(idx, 1)

               const id = removed.map((item) => item.id)[0]
               const filtered = getItemStorage.filter((value) => value.id !== id)

               const data = [...filtered]

               localStorage.setItem(key, JSON.stringify(data))
               set({ wished: data })
            },
         }),
         { name: 'preferences' }
      )
   )
)
