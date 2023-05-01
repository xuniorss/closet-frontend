import { ContainerComponent } from '@/templates/components/Container'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
   return <ContainerComponent>{children}</ContainerComponent>
}
