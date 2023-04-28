import { Products } from '@/models/products'
import { productsApi } from '@/services/apis'
import { useMediaQuery } from '@chakra-ui/react'
import { useCallback, useDeferredValue, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import removeAccents from 'remove-accents'

export const useCatalog = () => {
   const { data: dataProducts, isLoading } = useQuery<Products[]>({
      queryKey: process.env.NEXT_PUBLIC_ALL_PRODUCTS,
      queryFn: () => productsApi.list(),
      cacheTime: 60000, // Mantém a consulta em cache por 1 minuto
      staleTime: 30000, // Considera os dados em cache como "stale" após 30 segundos
   })

   const [mobile] = useMediaQuery('(max-width: 740px)')

   const [filtered, setFiltered] = useState<Products[]>((dataProducts && dataProducts) || [])
   const [products, setProducts] = useState<Products[]>([])
   const [search, setSearch] = useState('')
   const defferedSearch = useDeferredValue(search)

   const searchState = useCallback((value: string) => {
      setSearch(value)
   }, [])

   const handleClearInput = useCallback(() => {
      setFiltered([])
      setProducts((dataProducts && dataProducts) || [])
      setSearch('')
   }, [dataProducts])

   useEffect(() => {
      if (defferedSearch.length <= 3 || !dataProducts) {
         setFiltered([])
         return
      }

      const filtered = dataProducts.filter((value) =>
         value.product_name
            .toLowerCase()
            .includes(removeAccents.remove(defferedSearch.toLowerCase()))
      )

      setFiltered(filtered)
   }, [defferedSearch, dataProducts])

   useEffect(() => {
      if (!dataProducts) return

      if (filtered.length > 0) return setProducts(filtered)

      setProducts(dataProducts)
   }, [dataProducts, filtered])

   return {
      search,
      searchState,
      handleClearInput,
      filtered,
      defferedSearch,
      mobile,
      isLoading,
      products,
      dataProducts,
   }
}
