'use client'

import { Suspense, use } from 'react'
import { Metadata, ResolvingMetadata } from 'next'

import { getAquarium } from '@/library/api'
import AquariumData from './components/aquarium-data'
import Loading from './loading'

type AquariumProps = {
  params: { id: string }
}

// todo: fix page title
/* export async function generateMetadata(
  { params: { id } }: AquariumProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const aquarium = await getAquarium(id)

  return {
    title: 'AquaDynamics | ' + aquarium.name
  }
} */

export default function Aquarium({ params: { id } }: AquariumProps) {
  const aquarium = use(getAquarium(id, { include: { logs: true, controllers: true } }))

  return (
    <Suspense fallback={<Loading />}>
      <AquariumData data={aquarium} />
    </Suspense>
  )
}
