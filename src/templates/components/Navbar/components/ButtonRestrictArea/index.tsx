import { Tag } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import { Fragment, useCallback } from 'react'

export const ButtonRestrictArea = () => {
   const path = usePathname()
   const router = useRouter()

   const onClickButton = useCallback(() => {
      if (path !== '/restrict') return router.push('/signin')

      router.push('/')
   }, [path, router])

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
