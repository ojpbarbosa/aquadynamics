'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { WebSocketContext } from '@/contexts/websocket-context'
import { Header } from '@/components/layout/header'
import { Aquarium, Controller, ControllerStatus, Log } from '@/library/types'

type AquariumDataProps = {
  aquarium: Aquarium
}

export default function AquariumData({ aquarium }: AquariumDataProps) {
  const pathname = usePathname()

  const [aquariumLog, setAquariumLog] = useState(aquarium.logs![0])
  const [aquariumControllerStatus, setAquariumControllerStatus] = useState(
    aquarium.controller!.status as ControllerStatus
  )

  const { socket } = useContext(WebSocketContext)

  const onControllerStatusUpdate = useCallback(
    (data: Partial<Controller>) => {
      if (data.aquariumId === aquarium.id) setAquariumControllerStatus(data.status!)
    },
    [aquarium]
  )

  const onLog = useCallback(
    (data: Log) => {
      if (data.aquariumId === aquarium.id) setAquariumLog(data)
    },
    [aquarium]
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
    <>
      <Header subtreeName={aquarium.name} subtreeUrl={pathname} />
      <main className="overflow-y-auto overflow-x-hidden h-[80vh] w-screen">
        <div className="flex w-screen h-full items-start justify-around">
          <div className="w-5/6 flex flex-col sm:flex-row gap-4 pt-20">
            <div>{aquarium.id}</div>
            <div>Controller status: {aquariumControllerStatus}</div>
            <h1 className="text-6xl font-semibold">{aquariumLog?.temperature} °C</h1>
            <h1 className="text-6xl font-semibold">pH {aquariumLog?.pH}</h1>
          </div>
        </div>
      </main>
    </>
  )
}
