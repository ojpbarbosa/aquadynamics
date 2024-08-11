import { Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect } from 'react'
import { FiHelpCircle } from 'react-icons/fi'
import { DateTime } from 'luxon'

import { WebSocketContext } from '@/contexts/websocket-context'
import { type Log } from '@/library/types'
import { getPhMetadata, getTemperatureMetadata } from '@/library/metadata'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type AquariumLogProps = {
  aquariumId: string
  logs: Log[]
  setLogs: Dispatch<SetStateAction<Log[]>>
}

export default function AquariumLog({ aquariumId, logs, setLogs }: AquariumLogProps) {
  const { socket } = useContext(WebSocketContext)

  const { id, temperature, ph, lightning, timestamp } = logs[logs.length - 1]

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
    id && (
      <>
        <AquariumLogField
          fieldName="Temperature"
          field={temperature.toFixed(1) + '°C'}
          fieldLabel="The water temperature is"
          fieldMetadata={getTemperatureMetadata(temperature)}
          tooltip={
            <div>
              {[
                { term: 'Low', description: 'Above 20°C', color: '#3b82f6' },
                { term: 'Ideal', description: 'Between 20°C and 30°C', color: '#22c55e' },
                { term: 'High', description: 'Below 30°C', color: '#ef4444' }
              ].map((temperature) => (
                <dl className="flex gap-x-1" key={temperature.term}>
                  <dt className="flex items-center gap-x-2">
                    <div
                      style={{ backgroundColor: temperature.color }}
                      className="h-[10px] w-[10px] rounded-full"
                    />
                    {temperature.term}
                  </dt>
                  <dd className="dark:text-neutral-400 text-neutral-500">
                    {temperature.description}
                  </dd>
                </dl>
              ))}
            </div>
          }
        />

        <AquariumLogField
          fieldName="pH"
          field={ph.toFixed(1)}
          fieldLabel="The water pH is"
          fieldMetadata={getPhMetadata(ph)}
          className="mr-8 sm:mr-0"
          tooltip={
            <div>
              {[
                { term: 'Acidic', description: 'pH below 6.5', color: '#f59e0b' },
                { term: 'Ideal', description: 'pH between 6.5 and 7.5', color: '#22c55e' },
                { term: 'Alkaline', description: 'pH above 7.5', color: '#6366f1' }
              ].map((ph) => (
                <dl className="flex gap-x-1" key={ph.term}>
                  <dt className="flex items-center gap-x-2">
                    <div
                      style={{ backgroundColor: ph.color }}
                      className="h-[10px] w-[10px] rounded-full"
                    />
                    {ph.term}
                  </dt>
                  <dd className="dark:text-neutral-400 text-neutral-500">{ph.description}</dd>
                </dl>
              ))}
            </div>
          }
        />

        <dl className="flex flex-col gap-y-1">
          <dt className="dark:text-neutral-400 text-neutral-500 font-semibold">Lightning</dt>
          <dd className="flex flex-col">
            <p className="flex items-center gap-x-2">
              <div
                style={{
                  backgroundColor: lightning ? '#22c55e' : '#737373',
                  transition: 'ease',
                  transitionDuration: '1s'
                }}
                className="h-[10px] w-[10px] rounded-full"
              />
              {lightning ? 'On' : 'Off'}
            </p>
            <span className="dark:text-neutral-500 text-neutral-400 pt-2">
              9-hour photoperiod, from 08:00 to 17:00.
            </span>
          </dd>
        </dl>

        <dl className="flex flex-col gap-y-1">
          <dt className="dark:text-neutral-400 text-neutral-500 font-semibold">Updated at</dt>
          <dd>
            {DateTime.fromISO(logs[logs.length - 1].timestamp.toString(), {
              zone: 'America/Sao_Paulo'
            })
              .setLocale('en-UK')
              .toLocaleString(DateTime.DATETIME_MED)}
          </dd>
        </dl>
      </>
    )
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
        <span style={{ color: fieldMetadata.color, transition: 'ease', transitionDuration: '1s' }}>
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
            <p className="font-semibold">{fieldName}</p>
            {tooltip}
          </PopoverContent>
        </Popover>
      </p>
    </dl>
  )
}
