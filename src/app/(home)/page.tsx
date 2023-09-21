import { CollectionsResponseProps } from '@/models/collections'
import { Products } from '@/models/products'
import HomeTemplate from '@/templates/Home'

export const metadata = {
   title: 'Página inicial | Closet',
}

async function getProductsWeek(): Promise<Products[] | undefined> {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_API_FOR_DYNAMIC_METADATA}/products-week`,
         {
            method: 'GET',
            headers: {
               accept: 'application/json',
            },
            cache: 'no-store',
            next: { revalidate: 1 },
         }
      )

      if (!response.ok) throw new Error(`Error! status: ${response.status}`)
      const result: Array<Products> = await response.json()

      return result
   } catch (error) {
      console.error(error)
   }
}

async function getCollectionHome(): Promise<CollectionsResponseProps[] | undefined> {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_API_FOR_DYNAMIC_METADATA}/collections-home`,
         {
            method: 'GET',
            headers: {
               accept: 'application/json',
            },
            cache: 'no-store',
            next: { revalidate: 1 },
         }
      )

      if (!response.ok) throw new Error(`Error! status: ${response.status}`)
      const result: Array<CollectionsResponseProps> = await response.json()

      return result
   } catch (error) {
      console.error(error)
   }
}

export default async function Home() {
   const [productsWeek, collectionHome] = await Promise.all([
      getProductsWeek(),
      getCollectionHome(),
   ])

   return <HomeTemplate productsWeek={productsWeek} collectionHome={collectionHome} />
}
