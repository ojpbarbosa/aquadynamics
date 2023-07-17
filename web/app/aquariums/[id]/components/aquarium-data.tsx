'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { PiSpinnerGapLight } from 'react-icons/pi'

import Header from '@/components/layout/header'
import { Aquarium, Log } from '@/library/types'
import AquariumControllerStatus from './aquarium-controller-status'
import AquariumLog from './aquarium-log'
import AquariumTemperatureChart from './aquarium-temperature-chart'
import AquariumCamera from './aquarium-camera'
import { DateTime } from 'luxon'
import AquariumPHChart from './aquarium-ph-chart'

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
          <div className="w-5/6 flex flex-col sm:justify-between gap-4 py-14 gap-y-4">
            <div className="flex flex-col sm:justify-between sm:flex-row w-full">
              <AquariumCamera aquariumId={aquarium.id} />
              {aquarium.controller && (
                <div className="grid grid-cols-2 w-full sm:pt-0 pt-6 sm:w-1/2 sm:pl-12 gap-1 sm:gap-5">
                  {logs.length > 0 && (
                    <AquariumLog aquariumId={aquarium.id} logs={logs} setLogs={setLogs} />
                  )}
                  <AquariumControllerStatus aquarium={aquarium} setAquarium={setAquarium} />
                  <dl className="flex flex-col gap-y-1">
                    <dt className="text-neutral-500">Última atualização</dt>
                    <dd>
                      {DateTime.fromISO(logs[logs.length - 1].timestamp.toString(), {
                        zone: 'America/Sao_Paulo'
                      })
                        .setLocale('pt-BR')
                        .toLocaleString(DateTime.DATETIME_MED)}
                    </dd>
                  </dl>
                </div>
              )}
            </div>
            {logs.length > 0 && (
              <div className="flex flex-col gap-y-4 mt-6">
                <h1 className="text-2xl font-bold">Temperatura</h1>
                <AquariumTemperatureChart logs={logs} />
                <h1 className="text-2xl font-bold">pH</h1>
                <AquariumPHChart logs={logs} />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
