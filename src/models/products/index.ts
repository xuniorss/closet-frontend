export type Products = {
   id: string
   user_id: string
   model_id: string
   product_name: string
   price: string
   description: string
   quantity: number
   created_at: Date
   updated_at: Date
   image_url: string
}

export type ProductImageProps = {
   id: string
   product_id: string
   image_url: string
   media_id: string
   created_at: Date
   updated_at: Date
}

export type ProductSizesProps = {
   id: string
   product_id: string
   size_id: string
   size: string
   created_at: Date
   updated_at: Date
}

export type ProductsSpecificationProps = {
   id: string
   product_id: string
   color: string
   composition: string
   generic_code: string
   created_at: Date
   updated_at: Date
}

export type ProductsByIdProps = {
   product: Products
   productImage: ProductImageProps[]
   productSize: ProductSizesProps[]
   productSpec: ProductsSpecificationProps
}

export type StorageProps = {
   productImage: ProductImageProps[]
} & Products
