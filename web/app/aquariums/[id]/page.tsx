'use client'

import { Suspense } from 'react'

import { Aquarium } from '@/library/types'
import AquariumData from './components/aquarium-data'
import Loading from './loading'

type AquariumProps = {
  params: {
    id: string
  }
}

export default function Aquarium({ params: { id } }: AquariumProps) {
  return (
    <Suspense fallback={<Loading />}>
      <AquariumData id={id} />
    </Suspense>
  )
}
