'use client'

import { Aquarium, Log } from '@/library/types'
import Link from 'next/link'
import { useCallback, useContext, useEffect, useState } from 'react'
import { FaVideoSlash, FaLightbulb, FaRegLightbulb } from 'react-icons/fa'
import { WebSocketContext } from '../../contexts/websocket-context'

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
      className="h-56 sm:h-60 rounded dark:text-neutral-100/75 hover:dark:text-neutral-100 text-neutral-900 border justify-between border-gray-300 dark:border-neutral-800 bg-transparent hover:bg-neutral-100 dark:bg-transparent transition-all duration-200 hover:dark:bg-neutral-800/30 flex flex-col items-start"
    >
      <div className="w-full h-40 flex items-center justify-center bg-gray-200 text-neutral-500 dark:text-neutral-500 dark:bg-neutral-800/30 flex-col gap-y-2">
        <FaVideoSlash className="text-4xl" />
        <span className="font-semibold">Sem câmera</span>
      </div>
      <div className="border-t border-gray-300 dark:border-neutral-800 w-full flex flex-col justify-between p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <div className="text-md font-normal flex items-center justify-end gap-x-2">
          <div
            className={
              'border rounded p-2 align-center text-center ' +
              (aquariumLog?.lightning
                ? 'text-yellow-400 border-yellow-400 dark:bg-yellow-300/20 bg-yellow-400/30'
                : 'dark:text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800/30 text-neutral-500 border-neutral-300 bg-neutral-300/20')
            }
          >
            {aquariumLog?.lightning ? <FaLightbulb /> : <FaRegLightbulb />}
          </div>

          <div
            className={
              'border rounded px-2 py-1 align-middle text-center ' +
              (!aquariumLog?.id
                ? 'dark:text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800/30 text-neutral-500 border-neutral-300 bg-neutral-300/20 '
                : aquariumLog?.pH >= 6.5 && aquariumLog?.pH <= 7.5
                ? 'border-green-500 bg-green-400/20 dark:border-green-500/80 dark:bg-green-400/10'
                : aquariumLog?.pH < 6.5
                ? 'border-yellow-500 bg-yellow-400/20 dark:border-yellow-500/80 dark:bg-yellow-400/10'
                : aquariumLog?.pH > 7.5 &&
                  'border-blue-500 bg-blue-400/20 dark:border-blue-500/80 dark:bg-blue-400/10')
            }
          >
            pH {aquariumLog?.pH ?? '-'}
          </div>

          <div
            className={
              'border rounded px-2 py-1 align-middle text-center ' +
              (!aquariumLog?.id
                ? 'dark:text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800/30 text-neutral-500 border-neutral-300 bg-neutral-300/20'
                : aquariumLog?.temperature >= 26 && aquariumLog?.temperature <= 29
                ? 'border-green-500 bg-green-400/20 dark:border-green-500/80 dark:bg-green-400/10'
                : aquariumLog?.temperature < 26
                ? 'border-sky-500 bg-sky-400/20 dark:border-sky-500/80 dark:bg-sky-400/10'
                : aquariumLog?.temperature > 29 &&
                  'border-red-500 bg-red-400/20 dark:border-red-500/80 dark:bg-red-400/10')
            }
          >
            {aquariumLog?.temperature ?? '-'} °C
          </div>
        </div>
      </div>
    </Link>
  )
}
