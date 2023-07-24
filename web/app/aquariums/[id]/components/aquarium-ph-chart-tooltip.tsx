import { DateTime } from 'luxon'

import { getPhMetadata } from '@/library/metadata'

type ChartTooltipProps = {
  active?: boolean
  payload: any
}

export default function AquariumPhChartTooltip({ active, payload }: ChartTooltipProps) {
  let log, phMetadata
  if (payload && payload[0]) {
    log = payload[0].payload
    phMetadata = getPhMetadata(log.ph)
  }

  return active && phMetadata ? (
    <dl className="text-sm md:text-base rounded p-2 bg-neutral-300/60 dark:bg-neutral-800/70 backdrop-blur filter dark:text-neutral-100 text-neutral-900 border justify-between border-gray-300 dark:border-neutral-800 transition-colors duration-200">
      <dt className="font-semibold">pH</dt>
      <div className="flex items-center gap-x-2">
        <dd>{log.ph.toFixed(1).replace('.', ',')} °C</dd>
        <div
          style={{
            backgroundColor: phMetadata.color,
            transition: 'ease',
            transitionDuration: '1s'
          }}
          className={`h-[10px] w-[10px] rounded-full`}
        />
        {phMetadata.term}
      </div>
      <p className="text-neutral-400">
        {DateTime.fromISO(log.timestamp.toString(), {
          zone: 'America/Sao_Paulo'
        })
          .setLocale('pt-BR')
          .toLocaleString(DateTime.DATETIME_MED)}
      </p>
    </dl>
  ) : null
}
