import { useAuth } from '@/hooks/useAuth'
import { useSmallScreen } from '@/hooks/useSmallScreen'
import { Button } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import { Fragment, useCallback } from 'react'

export const ButtonRestrictArea = () => {
   const { user, signOut } = useAuth()
   const path = usePathname()
   const router = useRouter()
   const smallScreen = useSmallScreen()

   const onClickButton = useCallback(() => {
      if (user && path === '/restrict') return signOut()

      if (user) return router.push('/restrict')

      if (!user && path !== '/restrict') return router.push('/signin')
   }, [path, router, signOut, user])

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
               {path === '/restrict' && `${smallScreen ? 'Sair' : 'Desconectar'}`}
               {path !== '/restrict' && `${smallScreen ? 'Config.' : 'Área restrita'}`}
            </Button>
         )}
      </Fragment>
   )
}
