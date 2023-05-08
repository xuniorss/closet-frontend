import { useStore } from '@/components/useStore'
import { useSmallScreen } from '@/hooks/useSmallScreen'
import { useAuthStore } from '@/store/auth'
import { Button } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import { Fragment, useCallback } from 'react'

export const ButtonRestrictArea = () => {
   const path = usePathname()
   const router = useRouter()
   const smallScreen = useSmallScreen()

   const store = useStore(useAuthStore, (state) => state)

   const onClickButton = useCallback(() => {
      if (!store) return

      if (store.isAuthenticated) {
         store.signOut()
         router.push('/')
         return
      }

      if (store.authAdmin && path === '/restrict') {
         store.signOut()
         router.push('/')
         return
      }

      if (store.authAdmin) return router.push('/restrict')

      if (!store.authAdmin && path !== '/restrict') return router.push('/signin')
   }, [store, path, router])

   return (
      <Fragment>
         {path !== '/signin' && (
            <Button
               onClick={onClickButton}
               bgColor="main.500"
               _hover={{ bgColor: 'main.hover' }}
               p={4}
               w="auto"
               color="white"
               cursor="pointer"
            >
               {store && store.isAuthenticated ? 'Sair' : 'Entrar'}
               {path === '/restrict' &&
                  store &&
                  store.authAdmin &&
                  `${smallScreen ? 'Sair' : 'Desconectar'}`}
               {path !== '/restrict' &&
                  store &&
                  store.authAdmin &&
                  `${smallScreen ? 'Config.' : 'Área restrita'}`}
            </Button>
         )}
      </Fragment>
   )
}
