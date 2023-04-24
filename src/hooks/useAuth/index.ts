import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'

export const useAuth = () => {
   const auth = useContext(AuthContext)
   return auth
}
