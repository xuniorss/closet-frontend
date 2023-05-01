import { Navbar } from '@/templates/components/Navbar'
import { Rubik } from 'next/font/google'

import { Providers } from './providers'

const rubik = Rubik({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="pt-br">
         <body
            style={{
               backgroundColor: 'white',
               color: 'black',
            }}
            className={`${rubik.className}`}
         >
            <Providers>
               <Navbar />
               {children}
            </Providers>
         </body>
      </html>
   )
}
