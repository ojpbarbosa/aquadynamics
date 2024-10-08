'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

import Header from '@/components/layout/header'
import { type Aquarium, type Log } from '@/library/types'
import AquariumCamera from './aquarium-camera'
import AquariumLog from './aquarium-log'
import AquariumControllerStatus from './aquarium-controller-status'
import AquariumTemperatureChart from './aquarium-temperature-chart'
import AquariumPhChart from './aquarium-ph-chart'

type AquariumDataProps = {
  data: {
    aquarium: Aquarium
    logs: Log[]
  }
}

export default function AquariumData({ data }: AquariumDataProps) {
  const [aquarium, setAquarium] = useState(data.aquarium)
  const [logs, setLogs] = useState(data.logs)

  const pathname = usePathname()

  return (
    <>
      <Header subtreeName={aquarium.name} subtreeUrl={pathname} />
      <main className="overflow-y-auto overflow-x-hidden h-[80vh] w-screen">
        <div className="flex w-screen h-full items-start justify-around">
          <div className="w-5/6 flex flex-col sm:justify-between gap-4 py-12 gap-y-4">
            <div className="flex flex-col sm:justify-between sm:flex-row w-full">
              <AquariumCamera aquariumId={aquarium.id} />

              <div className="grid grid-cols-2 w-full sm:pt-0 pt-6 sm:w-1/2 sm:pl-12 gap-2 gap-y-4 sm:gap-6">
                {logs.length > 0 && (
                  <AquariumLog aquariumId={aquarium.id} logs={logs} setLogs={setLogs} />
                )}
                {aquarium.controller && (
                  <AquariumControllerStatus aquarium={aquarium} setAquarium={setAquarium} />
                )}
              </div>
            </div>
            {logs.length > 0 && (
              <div className="flex flex-col gap-y-4 mt-6">
                <h1 className="text-2xl font-bold">Temperature</h1>
                <AquariumTemperatureChart logs={logs} />
                <h1 className="text-2xl font-bold">pH</h1>
                <AquariumPhChart logs={logs} />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
