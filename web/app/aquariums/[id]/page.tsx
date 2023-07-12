import { Metadata, ResolvingMetadata } from 'next'

import { getAquarium, getLogs } from '@/library/api'
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
  const aquarium = await getAquarium(id, { include: { controllers: true } })
  const logs = await getLogs({ where: { aquariumId: id }, order: 'asc', orderBy: 'timestamp' })

  return <AquariumData data={{ aquarium, logs }} />
}
