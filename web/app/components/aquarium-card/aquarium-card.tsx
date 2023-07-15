'use client'

import Link from 'next/link'
import { useCallback, useContext, useEffect, useState } from 'react'

import { Aquarium, Log } from '@/library/types'
import { WebSocketContext } from '@/contexts/websocket-context'
import AquariumCardCamera from './aquarium-card-camera'
import AquariumCardDetail from './aquarium-card-detail'

type AquariumCardProps = {
  aquarium: Aquarium
}

export default function AquariumCard({ aquarium: { id, name, logs } }: AquariumCardProps) {
  const [aquariumLog, setAquariumLog] = useState(logs ? logs[logs.length - 1] : ({} as Log))
  const { socket } = useContext(WebSocketContext)

  const onLog = useCallback(
    (data: Log) => {
      if (data.aquariumId === id) setAquariumLog(data)
    },
    [id]
  )

  useEffect(() => {
    socket.on('log', onLog)

    return () => {
      socket.off('log', onLog)
    }
  }, [aquariumLog, logs, socket, onLog])

  return (
    <Link
      href={`/aquariums/${id}`}
      className="rounded dark:text-neutral-100 text-neutral-900 border justify-between border-gray-300 dark:border-neutral-800 bg-transparent hover:bg-neutral-100 transition-colors duration-200 hover:dark:bg-neutral-800/30 flex flex-col items-start"
    >
      <AquariumCardCamera />
      <div className="border-t border-gray-300 dark:border-neutral-800 w-full flex flex-col justify-between p-4 gap-y-2 h-44 sm:h-48 2xl:h-32">
        <h3 className="font-semibold text-lg">{name}</h3>
        {aquariumLog ? (
          <dl className="font-normal grid grid-cols-2 2xl:grid-cols-3 gap-y-1 sm:gap-y-2 gap-x-4">
            <AquariumCardDetail
              term="Iluminação"
              value={aquariumLog.lightning ? 'Ligada' : 'Desligada'}
              iconStyle={
                aquariumLog.lightning ? 'bg-green-500' : 'dark:bg-neutral-500 bg-neutral-400'
              }
            />
            <AquariumCardDetail
              term="Temperatura"
              value={`${
                aquariumLog.temperature ? aquariumLog.temperature.toFixed(1).replace('.', ',') : '-'
              } °C`}
              iconStyle={
                aquariumLog.temperature >= 26 && aquariumLog.temperature <= 29
                  ? 'bg-green-500'
                  : aquariumLog.temperature < 26
                  ? 'bg-blue-500'
                  : aquariumLog.temperature > 29
                  ? 'bg-red-500'
                  : ''
              }
            />
            <AquariumCardDetail
              term="pH"
              value={aquariumLog.pH ? aquariumLog.pH.toFixed(1).replace('.', ',') : '-'}
              iconStyle={
                aquariumLog.pH >= 6.5 && aquariumLog.pH <= 7.5
                  ? 'bg-green-500'
                  : aquariumLog.pH < 6.5
                  ? 'bg-orange-500'
                  : aquariumLog.pH > 7.5
                  ? 'bg-red-500'
                  : ''
              }
            />
          </dl>
        ) : (
          <p className="dark:text-neutral-500 text-neutral-400">Sem informações</p>
        )}
      </div>
    </Link>
  )
}
