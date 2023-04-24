import { useAuth } from '@/hooks/useAuth'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useProtectRoute = ({ redirectTo = '/' }: { redirectTo: string }) => {
   const { isAuthenticated } = useAuth()
   const router = useRouter()
   const path = usePathname()

   useEffect(() => {
      if (!isAuthenticated && path !== '/signin') {
         router.push(redirectTo)
      }
      return () => {}
   }, [isAuthenticated, path, redirectTo, router])
}
