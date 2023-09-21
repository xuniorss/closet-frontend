import { useStore } from '@/components/useStore'
import { useAuthStore } from '@/store/auth'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export const ButtonLogout = () => {
   const store = useStore(useAuthStore, (state) => state)
   const router = useRouter()

   const handleClick = () => {
      if (!store?.isAuthenticated) return router.push('/signin')
      return store?.signOut()
   }

   return (
      <Button
         bgColor="main.500"
         _hover={{ bgColor: 'main.hover' }}
         p={4}
         w="auto"
         color="white"
         cursor="pointer"
         onClick={handleClick}
      >
         {store?.isAuthenticated ? 'Sair' : 'Acessar'}
      </Button>
   )
}
