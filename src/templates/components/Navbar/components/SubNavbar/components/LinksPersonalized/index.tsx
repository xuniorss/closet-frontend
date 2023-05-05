import { Link, LinkProps, Tooltip } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'
import removeAccents from 'remove-accents'

type LinksPersProps = {
   title: string
   href?: string
   id?: string
} & LinkProps

export const LinksPersonalized = ({ title, href, id }: LinksPersProps) => {
   const path = usePathname()

   const url = (href && href) || `/${removeAccents(title).toLowerCase()}`

   const handleModelPage = useCallback(() => {
      if (!id) return

      const modelStorage = localStorage.getItem(
         `${process.env.NEXT_PUBLIC_MODEL_STORAGE}`
      ) as string

      if (modelStorage === id) return

      localStorage.setItem(`${process.env.NEXT_PUBLIC_MODEL_STORAGE}`, id)
   }, [id])

   return (
      <Link
         mr={4}
         px={2}
         py={1}
         borderRadius="md"
         fontWeight="medium"
         fontSize="sm"
         bg={path === url ? 'white' : 'transparent'}
         color={path === url ? 'gray.800' : 'gray.700'}
         _hover={{ textDecoration: 'none', bg: 'white', color: 'gray.800' }}
         href={url}
         onClick={handleModelPage}
      >
         <Tooltip label={`Ir para ${removeAccents(title).toUpperCase()}`}>
            {title.toUpperCase()}
         </Tooltip>
      </Link>
   )
}
