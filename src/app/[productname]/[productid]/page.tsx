import { Products, ProductsByIdProps } from '@/models/products'
import ProductDetailsTemplate from '@/templates/[productname]/[productid]'

export async function generateMetadata({ params }: { params: { productid: string } }) {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_API_FOR_DYNAMIC_METADATA}/products/${params.productid}`,
         {
            method: 'GET',
            headers: {
               accept: 'application/json',
            },
         }
      )

      if (!res.ok) throw new Error(`Error! status: ${res.status}`)
      const result: ProductsByIdProps = await res.json()

      return {
         title: `Closet | ${result.product.product_name}`,
      }
   } catch (error) {
      console.error(error)
   }
}

async function getProducById({ params }: { params: { productid: string } }) {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_API_FOR_DYNAMIC_METADATA}/products/${params.productid}`,
         {
            method: 'GET',
            headers: {
               accept: 'application/json',
            },
            cache: 'no-store',
            next: { revalidate: 10 },
         }
      )

      if (!res.ok) throw new Error(`Error! status: ${res.status}`)
      const result: ProductsByIdProps = await res.json()

      return result
   } catch (error) {
      console.error(error)
   }
}

export default async function ProductDetails({ params }: { params: { productid: string } }) {
   const products = (await getProducById({ params })) as ProductsByIdProps

   return <ProductDetailsTemplate products={products} />
}
