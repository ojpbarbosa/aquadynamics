'use client'

import { Suspense, use } from 'react'
import { Metadata, ResolvingMetadata } from 'next'

import { getAquarium } from '@/library/api'
import Aquarium from './aquarium'

type AquariumDataProps = {
  id: string
}

export async function generateMetadata(
  { params: { id } }: { params: AquariumDataProps },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const aquarium = await getAquarium(id)

  return {
    title: 'AquaDynamics | ' + aquarium.name
  }
}

export default function AquariumData({ id }: AquariumDataProps) {
  const aquarium = use(getAquarium(id, { include: { logs: true, controllers: true } }))

  return (
    <Suspense>
      <Aquarium aquarium={aquarium} />
    </Suspense>
  )
}
