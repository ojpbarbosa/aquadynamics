import { DateTime } from 'luxon'

import { getPHMetadata } from '@/library/metadata'

type ChartTooltipProps = {
  active?: boolean
  payload: any
}

export default function AquariumPHChartTooltip({ active, payload }: ChartTooltipProps) {
  let log, pHMetadata
  if (payload && payload[0]) {
    log = payload[0].payload
    pHMetadata = getPHMetadata(log.pH)
  }

  return active && pHMetadata ? (
    <dl className="text-sm md:text-base rounded p-2 bg-neutral-300/60 dark:bg-neutral-800/70 backdrop-blur filter dark:text-neutral-100 text-neutral-900 border justify-between border-gray-300 dark:border-neutral-800 transition-colors duration-200">
      <dt className="font-semibold">pH</dt>
      <div className="flex items-center gap-x-2">
        <dd>{log.pH.toFixed(1).replace('.', ',')} °C</dd>
        <div
          style={{ background: pHMetadata.color, transition: 'ease', transitionDuration: '1s' }}
          className={`h-[10px] w-[10px] rounded-full`}
        />
        {pHMetadata.term}
      </div>
      <dd>
        {DateTime.fromISO(log.timestamp.toString(), {
          zone: 'America/Sao_Paulo'
        })
          .setLocale('pt-BR')
          .toLocaleString(DateTime.DATETIME_MED)}
      </dd>
    </dl>
  ) : null
}