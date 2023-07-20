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
              {[
                { term: 'Baixa', description: 'Menor que 20 °C', color: '#3b82f6' },
                { term: 'Ideal', description: 'Entre 20 °C e 30 °C', color: '#22c55e' },
                { term: 'Alta', description: 'Maior que 30 °C', color: '#ef4444' }
              ].map((temperature) => (
                <dl className="flex gap-x-1" key={temperature.term}>
                  <dt className="flex items-center gap-x-2">
                    <div
                      style={{ backgroundColor: temperature.color }}
                      className="h-[10px] w-[10px] rounded-full"
                    />
                    {temperature.term}
                  </dt>
                  <dd className="text-neutral-400">
                    {'– '}
                    {temperature.description}
                  </dd>
                </dl>
              ))}
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
          className="mr-8 sm:mr-0"
          tooltip={
            <div>
              {[
                { term: 'Ácido', description: 'pH menor que 6,5', color: '#f59e0b' },
                { term: 'Ideal', description: 'pH entre 6,5 e 7,5', color: '#22c55e' },
                { term: 'Alcalino', description: 'pH maior que 7,5', color: '#6366f1' }
              ].map((pH) => (
                <dl className="flex gap-x-1" key={pH.term}>
                  <dt className="flex items-center gap-x-2">
                    <div
                      style={{ backgroundColor: pH.color }}
                      className="h-[10px] w-[10px] rounded-full"
                    />
                    {pH.term}
                  </dt>
                  <dd className="dark:text-neutral-400 text-neutral-500">
                    {'– '}
                    {pH.description}
                  </dd>
                </dl>
              ))}
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
  tooltip,
  className = 'sm:ml-0 ml-8'
}: {
  fieldName: string
  field: string
  fieldLabel: string
  fieldMetadata: { color: string; term: string }
  tooltip: ReactNode
  className?: string
}) {
  return (
    <dl className="flex flex-col gap-y-2 dark:text-neutral-500 text-neutral-400">
      <dt className="font-semibold dark:text-neutral-400 text-neutral-500">{fieldName}</dt>
      <dd className="text-2xl md:text-6xl font-semibold text-neutral-900 dark:text-neutral-100">
        {field}
      </dd>
      <p className="align-bottom sm:pt-3">
        {fieldLabel}{' '}
        <span style={{ color: fieldMetadata.color }} className="transition-colors duration-[2s]">
          {fieldMetadata.term.toLowerCase()}
        </span>{' '}
        <Popover>
          <PopoverTrigger>
            <FiHelpCircle className="text-neutral-500 dark:text-neutral-400" />
          </PopoverTrigger>
          <PopoverContent
            className={
              'space-y-1 bg-neutral-300/60 dark:bg-neutral-800/70 backdrop-blur filter dark:text-neutral-100 text-neutral-900 border-gray-300 dark:border-neutral-800 rounded ' +
              className
            }
          >
            <p className="font-semibold">
              {fieldName}
              <span className="dark:text-neutral-400 text-neutral-500">{' – '} Legenda</span>
            </p>
            {tooltip}
          </PopoverContent>
        </Popover>
      </p>
    </dl>
  )
}
