import ModelTemplate from '@/templates/[modelname]'

export async function generateMetadata({ params }: { params: { modelname: string } }) {
   const modelname = params.modelname.replace(/\b\w/g, (l) => l.toUpperCase())

   return {
      title: `Closet | ${modelname}`,
   }
}

export default function Model() {
   return <ModelTemplate />
}
