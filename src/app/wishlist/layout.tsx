'use client'

import { ContainerComponent } from '@/templates/components/Container'
import { Footer } from '@/templates/components/Footer'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
   return (
      <>
         <ContainerComponent>{children}</ContainerComponent>
         <Footer />
      </>
   )
}
