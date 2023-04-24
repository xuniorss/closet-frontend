import axios from 'axios'
import { parseCookies } from 'nookies'

export const setupAPIClient = (ctx = undefined) => {
   let cookies = parseCookies(ctx)

   const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: { Authorization: `Bearer ${cookies[`${process.env.NEXT_PUBLIC_COOKIES}`]}` },
   })

   return api
}
