import { Products } from '@/models/products'
import { Fragment } from 'react'
import { CardProducts } from './components/CardProducts'

type ListProductsProps = {
   products: Products[]
}

export const ProductsList = ({ products }: ListProductsProps) => {
   return (
      <Fragment>
         {products.map((product) => (
            <CardProducts key={product.id} value={product} />
         ))}
      </Fragment>
   )
}
