export type ModelPropsResponse = {
   id: string
   user_id: string
   model_name: string
   description?: string
}

export type ModelsPropsList = {
   id: string
   user_id: string
   model_name: string
   description: string | null
   created_at: Date
   updated_at: Date
}
