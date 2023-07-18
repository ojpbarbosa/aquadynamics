import { Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect } from 'react'
import { FiHelpCircle } from 'react-icons/fi'

import { WebSocketContext } from '@/contexts/websocket-context'
import { Log } from '@/library/types'
import { getPHMetadata, getTemperatureMetadata } from '@/library/metadata'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type AquariumLogProps = {
  aquariumId: string
  logs: Log[]
  setLogs: Dispatch<SetStateAction<Log[]>>
}

export default function AquariumLog({ aquariumId, logs, setLogs }: AquariumLogProps) {
  const { socket } = useContext(WebSocketContext)

  const { temperature, pH } = logs[logs.length - 1]

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
      {temperature && (
        <AquariumLogField
          fieldName="Temperatura"
          field={temperature.toFixed(1).replace('.', ',') + ' °C'}
          fieldLabel="A temperatura da aguá está"
          fieldMetadata={getTemperatureMetadata(temperature)}
          tooltip={
            <div>
              <dl className="flex gap-x-1 text-sm sm:text-base">
                <dt className="flex items-center gap-x-2 text-sm sm:text-base">
                  <div className="h-[10px] w-[10px] rounded-full text-sm sm:text-base bg-blue-500" />
                  Baixa
                </dt>
                <dd className="text-neutral-400">{'–'} Menos de 20 °C</dd>
              </dl>
              <dl className="flex gap-x-1 text-sm sm:text-base">
                <dt className="flex items-center gap-x-2 text-sm sm:text-base">
                  <div className="h-[10px] w-[10px] rounded-full text-sm sm:text-base bg-green-500" />
                  Ideal
                </dt>{' '}
                <dd className="text-neutral-400">{'–'} Entre 20 °C e 30 °C</dd>
              </dl>
              <dl className="flex gap-x-1 text-sm sm:text-base">
                <dt className="flex items-center gap-x-2 text-sm sm:text-base">
                  <div className="h-[10px] w-[10px] rounded-full text-sm sm:text-base bg-red-500" />
                  Alta
                </dt>{' '}
                <dd className="text-neutral-400">{'–'} Mais de 30 °C</dd>
              </dl>
            </div>
          }
        />
      )}
      {pH && (
        <AquariumLogField
          fieldName="pH"
          field={pH.toFixed(1).replace('.', ',')}
          fieldLabel="O pH da água está"
          fieldMetadata={getPHMetadata(pH)}
          tooltip={
            <div>
              <dl className="flex gap-x-1 text-sm sm:text-base">
                <dt className="flex items-center gap-x-2 text-sm sm:text-base">
                  <div className="h-[10px] w-[10px] rounded-full text-sm sm:text-base bg-amber-500" />
                  Ácido
                </dt>
                <dd className="text-neutral-400">{'–'} Menos de pH 6,5</dd>
              </dl>
              <dl className="flex gap-x-1 text-sm sm:text-base">
                <dt className="flex items-center gap-x-2 text-sm sm:text-base">
                  <div className="h-[10px] w-[10px] rounded-full text-sm sm:text-base bg-green-500" />
                  Ideal
                </dt>{' '}
                <dd className="text-neutral-400">{'–'} Entre pH 6,5 e pH 7,5</dd>
              </dl>
              <dl className="flex gap-x-1 text-sm sm:text-base">
                <dt className="flex items-center gap-x-2 text-sm sm:text-base">
                  <div className="h-[10px] w-[10px] rounded-full text-sm sm:text-base bg-indigo-500" />
                  Alcalino
                </dt>{' '}
                <dd className="text-neutral-400">{'–'} Mais de pH 7,5</dd>
              </dl>
            </div>
          }
        />
      )}
    </>
  )
}

function AquariumLogField({
  fieldName,
  field,
  fieldLabel,
  fieldMetadata,
  tooltip
}: {
  fieldName: string
  field: string
  fieldLabel: string
  fieldMetadata: { color: string; term: string }
  tooltip: ReactNode
}) {
  return (
    <dl className="flex flex-col gap-y-2 text-neutral-500">
      <dt className="text-sm sm:text-base">{fieldName}</dt>
      <dd className="text-2xl md:text-6xl font-semibold text-neutral-900 dark:text-neutral-100">
        {field}
      </dd>
      <p className="sm:text-base text-sm align-bottom sm:pt-3">
        {fieldLabel}{' '}
        <span
          style={{ color: fieldMetadata.color }}
          className="transition-colors duration-[2s] text-sm sm:text-base"
        >
          {fieldMetadata.term.toLowerCase()}
        </span>{' '}
        <Popover>
          <PopoverTrigger>
            <FiHelpCircle className="text-neutral-400" />
          </PopoverTrigger>
          <PopoverContent className="space-y-1 bg-neutral-300/60 dark:bg-neutral-800/70 backdrop-blur filter dark:text-neutral-100 text-neutral-900 border-gray-300 dark:border-neutral-800 rounded">
            <p className="font-semibold text-sm sm:text-base">Legenda</p>
            {tooltip}
          </PopoverContent>
        </Popover>
      </p>
    </dl>
  )
}
