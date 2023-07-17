import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

import { WebSocketContext } from '@/contexts/websocket-context'
import { Log } from '@/library/types'
import { getPHData, getTemperatureData } from '@/library/aquarium-data'

type AquariumLogProps = {
  aquariumId: string
  logs: Log[]
  setLogs: Dispatch<SetStateAction<Log[]>>
}

export default function AquariumLog({ aquariumId, logs, setLogs }: AquariumLogProps) {
  const { socket } = useContext(WebSocketContext)

  const temperatureData = getTemperatureData(logs ? logs[logs.length - 1].temperature : 0)
  const pHData = getPHData(logs ? logs[logs.length - 1]!.pH : 0)

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
    temperatureData &&
    pHData && (
      <>
        <div className="flex flex-col gap-y-2 text-neutral-500">
          <h1 className="text-2xl md:text-6xl font-semibold text-neutral-900 dark:text-neutral-100">
            {logs ? logs[logs.length - 1].temperature.toFixed(1).replace('.', ',') : '-'} °C
          </h1>
          <p className="sm:text-base text-sm">
            A temperatura da água está{' '}
            <span
              className={`text-${temperatureData.color} transition-colors duration-[2s] text-sm sm:text-base`}
            >
              {temperatureData.term?.toLowerCase()}
            </span>
          </p>
          <ul>
            <li className="flex items-center gap-x-2">
              <div className="h-[10px] w-[10px] rounded-full bg-blue-500" />
              <p className="text-sm sm:text-md">Água fria: Menos que 20 °C</p>
            </li>
            <li className="flex items-center gap-x-2">
              <div className="h-[10px] w-[10px] rounded-full bg-green-500" />
              <p className="text-sm sm:text-md">Água ideal: Entre 20 e 30 °C</p>
            </li>
            <li className="flex items-center gap-x-2">
              <div className="h-[10px] w-[10px] rounded-full bg-red-500" />
              <p className="text-sm sm:text-md">Água quente: Mais que 30 °C</p>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-y-2 text-neutral-500">
          <h1 className="text-2xl md:text-6xl font-semibold text-neutral-900 dark:text-neutral-100">
            pH {logs ? logs[logs.length - 1].pH.toFixed(1).replace('.', ',') : '-'}
          </h1>

          <p className="sm:text-base text-sm">
            O pH da água está{' '}
            <span
              className={`text-${pHData.color} transition-colors duration-[2s] text-sm sm:text-base`}
            >
              {pHData.term?.toLowerCase()}
            </span>
          </p>
          <ul>
            <li className="flex items-center gap-x-2">
              <div className="h-[10px] w-[10px] rounded-full bg-orange-500" />
              <p className='text-sm sm:text-md'>pH ácido: Menor que 6,5</p>
            </li>
            <li className="flex items-center gap-x-2">
              <div className="h-[10px] w-[10px] rounded-full bg-green-500" />
              <p className='text-sm sm:text-md'>pH ideal: Entre 6,5 e 7,5</p>
            </li>
            <li className="flex items-center gap-x-2">
              <div className="h-[10px] w-[10px] rounded-full bg-purple-500" />
              <p className='text-sm sm:text-md'>pH alcalino: Maior que 7,5</p>
            </li>
          </ul>
        </div>
      </>
    )
  )
}
