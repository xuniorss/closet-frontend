import { useSmallScreen } from '@/hooks/useSmallScreen'
import { ModelsPropsList } from '@/models/modelApi'
import { modelApi } from '@/services/apis'
import { Box, Flex } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import { useQuery } from 'react-query'
import { LinksPersonalized } from './components/LinksPersonalized'

type DefaultLinksProps = {
   name: string
   href: string
}

const defaultLinks: Array<DefaultLinksProps> = [{ name: 'Coleções', href: '/collections' }]

export const SubNavbar = () => {
   const path = usePathname()
   const smallScreen = useSmallScreen()

   const { data: models } = useQuery<ModelsPropsList[]>({
      queryKey: process.env.NEXT_PUBLIC_ALL_MODELS,
      queryFn: () => modelApi.models(),
      cacheTime: 60000,
      staleTime: 30000,
   })

   return (
      <Fragment>
         {path !== '/signin' && path !== '/restrict' && !smallScreen && (
            <Box bg="black" w="100%">
               <Flex justify="center" align="center" py={2}>
                  {defaultLinks.map((link) => (
                     <LinksPersonalized key={link.name} title={link.name} href={link.href} />
                  ))}
                  {models &&
                     models.map(({ id, model_name }) => (
                        <LinksPersonalized key={id} title={model_name} id={id} />
                     ))}
               </Flex>
               {/* <Text textAlign="center" fontSize="xs" color="gray.500">
                  Frete Grátis em compras acima de R$ 99,00*
               </Text> */}
            </Box>
         )}
      </Fragment>
   )
}
