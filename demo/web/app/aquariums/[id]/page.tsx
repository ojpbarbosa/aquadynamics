import { type Metadata, type ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'

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

  if (aquarium)
    return {
      title: 'AquaDynamics | ' + aquarium.name
    }

  return {
    title: 'AquaDynamics'
  }
}

export default async function Aquarium({ params: { id } }: AquariumProps) {
  const aquarium = await getAquarium(id, {
    include: { controllers: true }
  })

  if (!aquarium) return redirect('/aquariums')

  const logs = await getLogs({ where: { aquariumId: id }, order: 'asc', orderBy: 'timestamp' })

  if (aquarium && logs) return <AquariumData data={{ aquarium, logs }} />
}
