import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from 'react'

import { WebSocketContext } from '@/contexts/websocket-context'
import { Aquarium, Controller } from '@/library/types'

const controllerStatusMap = {
  unknown: {
    name: 'Sem informações',
    style:
      'dark:border-neutral-800 dark:bg-neutral-800/30 text-neutral-500 border-neutral-300 bg-neutral-300/20'
  },
  booting: {
    name: 'Inicializando',
    style:
      'text-yellow-500 border-yellow-500/30 bg-yellow-400/20 dark:border-yellow-500/40 dark:bg-yellow-400/10'
  },
  idling: {
    name: 'Ocioso',
    style:
      'text-blue-500 border-blue-500/30 bg-blue-400/20 dark:border-blue-500/40 dark:bg-blue-400/10'
  },
  logging: {
    name: 'Registrando',
    style:
      'text-green-500 border-green-500/30 bg-green-400/20 dark:border-green-500/40 dark:bg-green-400/10'
  },
  restarting: {
    name: 'Reiniciando',
    style:
      'text-yellow-500 border-yellow-500/30 bg-yellow-400/20 dark:border-yellow-500/40 dark:bg-yellow-400/10'
  },
  crashed: {
    name: 'Erro',
    style: 'text-red-500 border-red-500/30 bg-red-400/20 dark:border-red-500/40 dark:bg-red-400/10'
  }
}

type AquariumControllerStatusProps = {
  aquarium: Aquarium
  setAquarium: Dispatch<SetStateAction<Aquarium>>
}

export default function AquariumControllerStatus({
  aquarium,
  setAquarium
}: AquariumControllerStatusProps) {
  const [aquariumControllerStatus, setAquariumControllerStatus] = useState(
    aquarium.controller?.status
  )

  const { socket } = useContext(WebSocketContext)

  const onControllerStatusUpdate = useCallback(
    (data: Partial<Controller>) => {
      if (data.aquariumId === aquarium.id) {
        setAquariumControllerStatus(data.status!)
        setAquarium((previous) => ({
          ...previous,
          controller: {
            ...previous.controller!,
            status: data.status!
          }
        }))
      }
    },
    [aquarium, setAquarium]
  )

  useEffect(() => {
    socket.on('controller_status_update', onControllerStatusUpdate)

    return () => {
      socket.off('controller_status_update', onControllerStatusUpdate)
    }
  }, [socket, onControllerStatusUpdate])

  const status = controllerStatusMap[aquariumControllerStatus!]

  return (
    <div className="flex items-center gap-2">
      <span className={'border rounded p-2 align-middle text-center ' + status.style}>
        {status.name}
      </span>
    </div>
  )
}
