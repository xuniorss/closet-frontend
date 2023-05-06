import { Products } from '../products'

export type CollectionsResponseProps = {
   collection_id: string
   collection_name: string
   show_home: boolean
   num_items: number
   final_date: Date
} & Products
