'use client'

import { use, useCallback, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Head from 'next/head'

import { WebSocketContext } from '@/contexts/websocket-context'
import { Controller, ControllerStatus, Log } from '@/library/types'
import { getAquarium } from '@/library/api'
import { Header } from '@/components/layout/header'

type AquariumDataProps = {
  id: string
}

export default function AquariumData({ id }: AquariumDataProps) {
  const pathname = usePathname()
  const aquarium = use(getAquarium(id))

  const [aquariumLog, setAquariumLog] = useState({} as Log)
  const [aquariumControllerStatus, setAquariumControllerStatus] = useState(
    'unknown' as ControllerStatus
  )

  const { socket } = useContext(WebSocketContext)

  const onControllerStatusUpdate = useCallback(
    (data: Partial<Controller>) => {
      if (data.aquariumId === id) setAquariumControllerStatus(data.status!)
    },
    [id]
  )

  const onLog = useCallback(
    (data: Log) => {
      if (data.aquariumId === id) setAquariumLog(data)
    },
    [id]
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
    aquarium && (
      <>
        <Head>
          <title>AquaDynamics |dasdas {aquarium.name}</title>
        </Head>
        <Header subtreeName={aquarium.name} subtreeUrl={pathname} />
        <main className="overflow-y-auto overflow-x-hidden h-[80vh] w-screen">
          <div className="flex w-screen h-full items-start justify-around">
            <div className="w-5/6 flex flex-col sm:flex-row gap-4 pt-20">
              <div>{id}</div>
              <div>Controller status: {aquariumControllerStatus}</div>
              <h1 className="text-6xl font-semibold">{aquariumLog?.temperature ?? '-'} °C</h1>
              <h1 className="text-6xl font-semibold">pH {aquariumLog?.pH ?? '-'}</h1>
            </div>
          </div>
        </main>
      </>
    )
  )
}
