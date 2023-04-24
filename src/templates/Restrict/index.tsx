'use client'

import { useProtectRoute } from '@/hooks/useProtectRoute'

export default function RestrictAreaTemplate() {
   useProtectRoute({ redirectTo: '/' })
   return <p>Area restrita</p>
}
