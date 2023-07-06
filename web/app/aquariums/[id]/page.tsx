import { Metadata, ResolvingMetadata } from 'next'

import { getAquarium } from '@/library/api'
import AquariumData from './components/aquarium-data'

type AquariumProps = {
  params: { id: string }
}

export async function generateMetadata(
  { params: { id } }: AquariumProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const aquarium = await getAquarium(id)

  return {
    title: 'AquaDynamics | ' + aquarium.name
  }
}

export default async function Aquarium({ params: { id } }: AquariumProps) {
  const aquarium = await getAquarium(id, { include: { logs: true, controllers: true } })

  return <AquariumData data={aquarium} />
}
