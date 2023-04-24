import { useAuth } from '@/hooks/useAuth'
import { Tag } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import { Fragment, useCallback } from 'react'

export const ButtonRestrictArea = () => {
   const { user, signOut } = useAuth()
   const path = usePathname()
   const router = useRouter()

   const onClickButton = useCallback(() => {
      if (user && path === '/restrict') return signOut()

      if (user) return router.push('/restrict')

      if (!user && path !== '/restrict') return router.push('/signin')
   }, [path, router, signOut, user])

   return (
      <Fragment>
         {path !== '/signin' && (
            <Tag
               onClick={onClickButton}
               bgColor="#D4BF90"
               p={2}
               color="white"
               cursor="pointer"
               role="button"
            >
               {path === '/restrict' && 'Desconectar'}
               {path !== '/restrict' && 'Área restrita'}
            </Tag>
         )}
      </Fragment>
   )
}
