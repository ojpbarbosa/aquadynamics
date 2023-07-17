import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from 'react'

import { WebSocketContext } from '@/contexts/websocket-context'
import { Aquarium, Controller } from '@/library/types'

const controllerStatusMap = {
  unknown: {
    name: 'Sem informações',
    bulletColor: 'dark:bg-neutral-500 bg-netural-400'
  },
  booting: {
    name: 'Inicializando',
    bulletColor: 'bg-yellow-500'
  },
  idling: {
    name: 'Ocioso',
    bulletColor: 'bg-blue-500'
  },
  logging: {
    name: 'Registrando',
    bulletColor: 'bg-green-500'
  },
  restarting: {
    name: 'Reiniciando',
    bulletColor: 'bg-orange-500'
  },
  crashed: {
    name: 'Erro',
    bulletColor: 'bg-red-500'
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
    <dl className="flex flex-col gap-y-1">
      <dt className="text-neutral-500">Status do controlador</dt>
      <div className="flex items-center gap-x-2 ">
        <div
          className={
            'h-[10px] w-[10px] rounded-full transition-colors duration-[2s] ' + status.bulletColor
          }
        />
        {status.name}
      </div>
    </dl>
  )
}
