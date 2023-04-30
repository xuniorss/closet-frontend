import crypto from 'crypto'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { storage } from '../../firebase'
import { UploadImageProductProps } from './models'

export const uploadImageProductStorate = async ({ files }: UploadImageProductProps) => {
   const bytes = crypto.randomBytes(4)
   const number = bytes.readUInt32BE(0)
   const cod = number % 100000000

   const promises = files.map(async (file) => {
      const storageRef = ref(storage, `products/${cod}/${file.name}`)

      try {
         await uploadBytes(storageRef, file)
      } catch (error) {
         console.error(error)
      }

      const mediaUrl = await getDownloadURL(storageRef)
      const mediaName = file.name
      const mediaId = cod

      return { mediaUrl }
   })

   const results = await Promise.all(promises)

   return results
}
