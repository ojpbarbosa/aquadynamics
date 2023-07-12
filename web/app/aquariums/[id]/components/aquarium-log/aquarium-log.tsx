import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from 'react'

import { WebSocketContext } from '@/contexts/websocket-context'
import { Log } from '@/library/types'

type AquariumLogProps = {
  aquariumId: string
  logs: Log[]
  setLogs: Dispatch<SetStateAction<Log[]>>
}

export default function AquariumLog({ aquariumId, logs, setLogs }: AquariumLogProps) {
  const { socket } = useContext(WebSocketContext)

  const onLog = useCallback(
    (data: Log) => {
      if (data.aquariumId === aquariumId) {
        setLogs((previous) => [...previous, data])
      }
    },
    [aquariumId, setLogs]
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
        {logs ? logs[logs.length - 1].temperature.toFixed(1) : '-'} °C
      </h1>
      <h1 className="text-3xl md:text-6xl font-semibold">
        pH {logs ? logs[logs.length - 1].pH.toFixed(1) : '-'}
      </h1>
    </>
  )
}
