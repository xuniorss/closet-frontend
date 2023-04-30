import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useProtectRoute = (privateRoute: boolean = true) => {
   const { authAdmin } = useAuth()
   const router = useRouter()

   useEffect(() => {
      if (authAdmin && !privateRoute) return router.push('/')
      if (!authAdmin && privateRoute) return router.push('/signin')

      return () => {}
   }, [authAdmin, privateRoute, router])
}
