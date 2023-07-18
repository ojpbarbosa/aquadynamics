import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from 'react'
import { FiHelpCircle } from 'react-icons/fi'

import { WebSocketContext } from '@/contexts/websocket-context'
import { Aquarium, Controller, ControllerStatus } from '@/library/types'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { controllerStatusesMetadata, getControllerStatusMetadata } from '@/library/metadata'

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

  const statusMetadata = getControllerStatusMetadata(aquariumControllerStatus!)

  return (
    <dl className="flex flex-col gap-y-1">
      <dt className="text-neutral-500 text-sm sm:text-base">Status do controlador</dt>
      <div className="flex items-center gap-x-2 text-sm sm:text-base ">
        <div
          className={
            'h-[10px] w-[10px] rounded-full transition-colors duration-1000 text-sm sm:text-base ' +
            statusMetadata.bulletBackgroundColor
          }
        />
        <p>
          {statusMetadata.status}{' '}
          <Popover>
            <PopoverTrigger>
              <FiHelpCircle className="text-neutral-400" />
            </PopoverTrigger>
            <PopoverContent className="space-y-1 bg-neutral-300/60 dark:bg-neutral-800/70 backdrop-blur filter dark:text-neutral-100 text-neutral-900 border-gray-300 dark:border-neutral-800 rounded">
              <p className="font-semibold text-sm sm:text-base">Legenda</p>
              <div>
                {Object.keys(controllerStatusesMetadata).map((controllerStatus) => {
                  const controllerStatusMetadata =
                    controllerStatusesMetadata[controllerStatus as ControllerStatus]

                  return (
                    <dl className="flex flex-col text-sm sm:text-base" key={controllerStatus}>
                      <dt className="flex items-center gap-x-2 text-sm sm:text-base">
                        <div
                          className={
                            'h-[10px] w-[10px] rounded-full text-sm sm:text-base ' +
                            controllerStatusMetadata.bulletBackgroundColor
                          }
                        />
                        {controllerStatusMetadata.status}
                      </dt>
                      <dd className="text-neutral-400">
                        {'–'}
                        {controllerStatusMetadata.description}
                      </dd>
                    </dl>
                  )
                })}
              </div>
            </PopoverContent>
          </Popover>
        </p>
      </div>
    </dl>
  )
}
