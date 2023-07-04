'use client'

import AquariumCard from './aquarium-card'
import { getAquariums } from '@/library/api'
import { use } from 'react'

export default function Aquariums() {
  const aquariums = use(getAquariums({ include: { logs: true } }))

  return aquariums.map((aquarium) => <AquariumCard key={aquarium.id} aquarium={aquarium} />)
}
