'use client'

import Link from 'next/link'
import { useCallback, useContext, useEffect, useState } from 'react'
import { FaVideoSlash, FaLightbulb, FaRegLightbulb } from 'react-icons/fa'

import { Aquarium, Log } from '@/library/types'
import { WebSocketContext } from '@/contexts/websocket-context'
import AquariumCardSkeleton from './aquarium-card-skeleton'

type AquariumCardProps = {
  aquarium: Aquarium
}

export default function AquariumCard({ aquarium: { id, name, logs } }: AquariumCardProps) {
  const [aquariumLog, setAquariumLog] = useState(logs ? logs[0] : ({} as Log))
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
      className="h-60 sm:h-64 rounded dark:text-neutral-100/75 hover:dark:text-neutral-100 text-neutral-900 border justify-between border-gray-300 dark:border-neutral-800 bg-transparent hover:bg-neutral-100 dark:bg-transparent transition-all duration-200 hover:dark:bg-neutral-800/30 flex flex-col items-start"
    >
      <div className="w-full h-40 flex items-center justify-center bg-neutral-300/20 text-neutral-500 dark:text-neutral-500 dark:bg-neutral-800/30">
        <FaVideoSlash className="text-4xl" />
        {/* <PiSpinnerGapLight className="text-4xl animate-spin" /> */}
      </div>
      <div className="border-t border-gray-300 dark:border-neutral-800 w-full flex flex-col justify-between p-4 h-24">
        <h3 className="font-semibold text-lg">{name}</h3>
        <div className="text-md font-normal flex items-center justify-end gap-x-2">
          <div
            className={
              'border rounded p-2 align-middle text-center ' +
              (aquariumLog?.lightning
                ? 'text-yellow-500 border-yellow-500/30 bg-yellow-400/20 dark:border-yellow-500/40 dark:bg-yellow-400/10'
                : 'dark:border-neutral-800 dark:bg-neutral-800/30 text-neutral-500 border-neutral-300 bg-neutral-300/20')
            }
          >
            {aquariumLog?.lightning ? <FaLightbulb /> : <FaRegLightbulb />}
          </div>

          <div
            className={
              'border rounded px-2 py-1 align-middle text-center ' +
              (!aquariumLog?.id
                ? 'text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800/30 border-neutral-300 bg-neutral-300/20 '
                : aquariumLog?.pH >= 6.5 && aquariumLog?.pH <= 7.5
                ? 'text-green-500 border-green-500/30 bg-green-400/20 dark:border-green-500/40 dark:bg-green-400/10'
                : aquariumLog?.pH < 6.5
                ? 'text-yellow-500 border-yellow-500/30 bg-yellow-400/20 dark:border-yellow-500/40 dark:bg-yellow-400/10'
                : aquariumLog?.pH > 7.5 &&
                  'text-blue-500 border-blue-500/30 bg-blue-400/20 dark:border-blue-500/40 dark:bg-blue-400/10')
            }
          >
            pH {aquariumLog?.pH}
          </div>

          <div
            className={
              'border rounded px-2 py-1 align-middle text-center ' +
              (!aquariumLog?.id
                ? 'text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800/30 border-neutral-300 bg-neutral-300/20 '
                : aquariumLog?.temperature >= 26 && aquariumLog?.temperature <= 29
                ? 'text-green-500 border-green-500/30 bg-green-400/20 dark:border-green-500/40 dark:bg-green-400/10'
                : aquariumLog?.temperature < 26
                ? 'text-blue-500 border-blue-500/30 bg-blue-400/20 dark:border-blue-500/40 dark:bg-blue-400/10'
                : aquariumLog?.temperature > 29 &&
                  'text-red-500 border-red-500/30 bg-red-400/20 dark:border-red-500/40 dark:bg-red-400/10')
            }
          >
            {aquariumLog?.temperature} °C
          </div>
        </div>
      </div>
    </Link>
  )
}
