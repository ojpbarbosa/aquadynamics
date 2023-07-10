'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { PiSpinnerGapLight } from 'react-icons/pi'

import Header from '@/components/layout/header'
import { Aquarium } from '@/library/types'
import AquariumControllerStatus from './aquarium-controller-status'
import AquariumLog from './aquarium-log'

type AquariumDataProps = {
  data: Aquarium
}

export default function AquariumData({ data }: AquariumDataProps) {
  const [aquarium, setAquarium] = useState(data)

  const pathname = usePathname()

  return (
    <>
      <Header subtreeName={aquarium.name} subtreeUrl={pathname} />
      <main className="overflow-y-auto overflow-x-hidden h-[80vh] w-screen">
        <div className="flex w-screen h-full items-start justify-around">
          <div className="w-5/6 flex flex-col sm:flex-row justify-between gap-4 py-10 sm:py-20">
            <div className="aspect-video w-full sm:w-2/3 rounded border border-gray-300 dark:border-neutral-800 flex items-center justify-center bg-neutral-300/20 text-neutral-500 dark:text-neutral-500 dark:bg-neutral-800/30">
              <PiSpinnerGapLight className="text-4xl animate-spin" />
            </div>
            <div className="flex flex-row sm:flex-col md:w-1/6 lg:w-1/3 gap-y-2 justify-between items-center">
              <AquariumControllerStatus aquarium={aquarium} setAquarium={setAquarium} />
              <AquariumLog aquarium={aquarium} setAquarium={setAquarium} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
