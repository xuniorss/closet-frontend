export type UserProps = {
   id: string
   username: string
   email: string
   is_adm: boolean
   created_at: Date
   updated_at: Date
}

type TokenProps = {
   type: string
   token: string
}

export interface UserRequest {
   user: UserProps
   token: TokenProps
   expires: number
}
