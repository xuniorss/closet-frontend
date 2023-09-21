import { useStore } from '@/components/useStore'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useProtectRoute = (privateRoute: boolean = true) => {
   const store = useStore(useAuthStore, (state) => state)
   const router = useRouter()

   useEffect(() => {
      if (!store) return

      if (store.authAdmin && !privateRoute) return router.push('/')
      if (!store.authAdmin && privateRoute) return router.push('/signin')

      return () => {}
   }, [privateRoute, router, store])
}
