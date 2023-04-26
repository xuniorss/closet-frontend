import {
   deleteObject,
   getDownloadURL,
   getMetadata,
   listAll,
   ref,
   uploadBytes,
} from 'firebase/storage'
import { storage } from '../../firebase'
import { UploadImageProductProps } from './models'

export const uploadImageProductStorate = async ({ file }: UploadImageProductProps) => {
   const storageRef = ref(storage, `products/${file.lastModified}/${file.name}`)

   const listStorageRef = ref(storage, `products/${file.lastModified}`)
   const files = await listAll(listStorageRef)

   if (files.items.length > 0) {
      const latestMedia = await files.items.reduce(async (latestMedia, currentMedia) => {
         const prevMetadata = await getMetadata(await latestMedia)
         const currMetadata = await getMetadata(currentMedia)

         return currMetadata.updated < prevMetadata.updated ? latestMedia : currentMedia
      }, Promise.resolve(files.items[0]))

      if (latestMedia.name === file.name) {
         const mediaForDeleteRef = ref(storage, `products/${file.lastModified}/${latestMedia.name}`)
         await deleteObject(mediaForDeleteRef)
      }
   }

   try {
      await uploadBytes(storageRef, file)
   } catch (error) {
      console.error(error)
   }

   const mediaUrl = await getDownloadURL(storageRef)
   const mediaName = file.name
   const mediaId = file.lastModified

   return { mediaName, mediaUrl, mediaId }
}
