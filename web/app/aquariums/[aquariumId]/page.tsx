'use client'

import { Suspense, useCallback, useContext, useEffect, useState } from 'react'
import { WebSocketContext } from '@/app/context/websocket-context'
import { Controller, ControllerStatus, Log } from '@/library/types'

type AquariumParams = {
  params: {
    aquariumId: string
  }
}

export default function Aquarium({ params: { aquariumId } }: AquariumParams) {
  const [aquariumLog, setAquariumLog] = useState({} as Log)
  const [aquariumControllerStatus, setAquariumControllerStatus] = useState(
    'unknown' as ControllerStatus
  )
  const { socket } = useContext(WebSocketContext)

  const onControllerStatusUpdate = useCallback(
    (data: Partial<Controller>) => {
      if (data.aquariumId === aquariumId) setAquariumControllerStatus(data.status!)
    },
    [aquariumId]
  )

  const onLog = useCallback(
    (data: Log) => {
      if (data.aquariumId === aquariumId) setAquariumLog(data)
    },
    [aquariumId]
  )

  useEffect(() => {
    socket.on('controller_status_update', onControllerStatusUpdate)
    socket.on('log', onLog)

    return () => {
      socket.off('controller_status_update', onControllerStatusUpdate)
      socket.off('log', onLog)
    }
  }, [socket, onControllerStatusUpdate, onLog])

  return (
    <div className="flex w-screen h-full items-start justify-around">
      <div className="w-5/6 flex flex-col sm:flex-row gap-4 pt-20">
        <div>{aquariumId}</div>
        <div>Controller status: {aquariumControllerStatus}</div>
        <h1 className="text-6xl font-semibold">{aquariumLog?.temperature ?? '-'} °C</h1>
        <h1 className="text-6xl font-semibold">pH {aquariumLog?.pH ?? '-'}</h1>
      </div>
    </div>
  )
}
