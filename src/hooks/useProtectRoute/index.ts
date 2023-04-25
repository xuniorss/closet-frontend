import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useProtectRoute = (privateRoute: boolean = true) => {
   const { isAuthenticated } = useAuth()
   const router = useRouter()

   useEffect(() => {
      if (isAuthenticated && !privateRoute) return router.push('/')
      if (!isAuthenticated && privateRoute) return router.push('/signin')

      return () => {}
   }, [isAuthenticated, privateRoute, router])
}
