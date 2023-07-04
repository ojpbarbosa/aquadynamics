'use client'

import { Suspense, useCallback, useContext, useEffect, useState } from 'react'
import { WebSocketContext } from '@/app/context/websocket-context'
import { Controller, ControllerStatus } from '@/library/types'

type AquariumParams = {
  params: {
    aquariumId: string
  }
}

export default function Aquarium({ params: { aquariumId } }: AquariumParams) {
  const [controllerStatus, setControllerStatus] = useState('unknown' as ControllerStatus)
  const { socket } = useContext(WebSocketContext)

  const onControllerStatusUpdate = useCallback(
    (data: Partial<Controller>) => {
      if (data.aquariumId === aquariumId) {
        setControllerStatus(data.status!)
      }
    },
    [aquariumId]
  )

  useEffect(() => {
    socket && socket.on('controller_status_update', onControllerStatusUpdate)

    return () => {
      socket && socket.off('controller_status_update', onControllerStatusUpdate)
    }
  }, [socket, onControllerStatusUpdate])

  return (
    <div className="flex w-screen h-full items-start justify-around">
      <div className="w-5/6 grid grid-cols-2 gap-2 gap-y-10 md:grid-cols-3 pt-20">
        <Suspense>
          <div>{aquariumId}</div>
          <div>Controller status: {controllerStatus}</div>
        </Suspense>
      </div>
    </div>
  )
}
