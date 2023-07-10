import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from 'react'

import { WebSocketContext } from '@/contexts/websocket-context'
import { Aquarium, Log } from '@/library/types'

type AquariumLogProps = {
  aquarium: Aquarium
  setAquarium: Dispatch<SetStateAction<Aquarium>>
}

export default function AquariumLog({ aquarium, setAquarium }: AquariumLogProps) {
  const [aquariumLog, setAquariumLog] = useState(
    aquarium.logs ? aquarium.logs[aquarium.logs.length - 1] : ({} as Log)
  )

  const { socket } = useContext(WebSocketContext)

  const onLog = useCallback(
    (data: Log) => {
      if (data.aquariumId === aquarium.id) {
        setAquariumLog(data)
        setAquarium((previous) => ({ ...previous, logs: [data, ...previous.logs!] }))
      }
    },
    [aquarium, setAquarium]
  )

  useEffect(() => {
    socket.on('log', onLog)

    return () => {
      socket.off('log', onLog)
    }
  }, [socket, onLog])

  return (
    <>
      <h1 className="text-3xl md:text-6xl font-semibold">
        {aquariumLog ? aquariumLog.temperature.toFixed(1) : '-'} °C
      </h1>
      <h1 className="text-3xl md:text-6xl font-semibold">
        pH {aquariumLog ? aquariumLog.pH.toFixed(1) : '-'}
      </h1>
    </>
  )
}
