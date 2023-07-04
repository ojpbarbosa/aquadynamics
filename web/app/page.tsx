'use client'

import Aquariums from './components/aquariums'
import AquariumsSkeleton from './components/aquarium-card-skeleton'
import { Suspense } from 'react'

export default function Home() {
  return (
    <div className="flex w-screen h-full items-start justify-center sm:justify-around">
      <div className="w-5/6 grid grid-cols-1 sm:grid-cols-2 justify-center items-center align-middle gap-2 gap-y-10 md:grid-cols-3 pt-20">
        <Suspense fallback={<AquariumsSkeleton />}>
          <Aquariums />
        </Suspense>
      </div>
    </div>
  )
}
