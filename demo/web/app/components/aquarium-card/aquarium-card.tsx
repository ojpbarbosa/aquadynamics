'use client'

import Link from 'next/link'
import { useCallback, useContext, useEffect, useState } from 'react'

import { type Aquarium, type Log } from '@/library/types'
import { WebSocketContext } from '@/contexts/websocket-context'
import AquariumCardCamera from './aquarium-card-camera'
import AquariumCardDetail from './aquarium-card-detail'
import { getPhMetadata, getTemperatureMetadata } from '@/library/metadata'

type AquariumCardProps = {
  aquarium: Aquarium
}

export default function AquariumCard({ aquarium: { id, name, logs } }: AquariumCardProps) {
  const [log, setLog] = useState(logs ? logs[logs.length - 1] : ({} as Log))
  const { socket } = useContext(WebSocketContext)

  let temperatureMetadata, pHData
  if (log) {
    temperatureMetadata = getTemperatureMetadata(log.temperature)
    pHData = getPhMetadata(log.ph)
  }

  const onLog = useCallback(
    (data: Log) => {
      if (data.aquariumId === id) setLog(data)
    },
    [id]
  )

  useEffect(() => {
    socket.on('log', onLog)

    return () => {
      socket.off('log', onLog)
    }
  }, [log, logs, socket, onLog])

  return (
    <Link
      href={`/aquariums/${id}`}
      className="rounded dark:text-neutral-100 text-neutral-900 border justify-between border-gray-300 dark:border-neutral-800 bg-transparent hover:bg-neutral-100 transition-colors duration-200 hover:dark:bg-neutral-800/30 flex flex-col items-start"
    >
      <AquariumCardCamera aquariumId={id} />
      <div className="border-t border-gray-300 dark:border-neutral-800 w-full flex flex-col justify-between p-4 gap-y-2 h-44 sm:h-48 2xl:h-32">
        <h3 className="font-semibold text-lg">{name}</h3>
        {log ? (
          <dl className="font-normal grid grid-cols-2 2xl:grid-cols-3 gap-y-1 sm:gap-y-2 gap-x-4">
            <AquariumCardDetail
              term="Lightning"
              value={log.lightning ? 'On' : 'Off'}
              bulletColor={log.lightning ? '#22c55e' : '#737373'}
            />
            <AquariumCardDetail
              term="Temperature"
              value={`${
                log.temperature ? (Math.floor(log.temperature * 100) / 100).toString() : '-'
              }°C`}
              bulletColor={temperatureMetadata!.color!}
            />
            <AquariumCardDetail
              term="pH"
              value={log.ph ? (Math.floor(log.ph * 100) / 100).toString() : '-'}
              bulletColor={pHData!.color!}
            />
          </dl>
        ) : (
          <p className="dark:text-neutral-400 text-neutral-500 font-semibold">No info</p>
        )}
      </div>
    </Link>
  )
}
