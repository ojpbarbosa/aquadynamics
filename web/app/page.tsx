'use client'

import { Suspense, use } from 'react'

import Header from '@/components/layout/header'
import Loading from './loading'
import { getAquariums } from '@/library/api'
import AquariumCard from './components/aquarium-card/aquarium-card'

export default function Home() {
  const aquariums = use(getAquariums({ include: { logs: true } }))

  return (
    <>
      <Header />
      <main className="overflow-y-auto overflow-x-hidden h-[80vh] w-screen">
        <div className="flex w-full h-full items-start justify-center sm:justify-around">
          <div className="w-5/6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-12 lg:gap-16 py-11">
            <Suspense fallback={<Loading />}>
              {aquariums.map((aquarium) => (
                <AquariumCard key={aquarium.id} aquarium={aquarium} />
              ))}
            </Suspense>
          </div>
        </div>
      </main>
    </>
  )
}
