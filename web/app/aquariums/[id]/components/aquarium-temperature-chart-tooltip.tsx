import { DateTime } from 'luxon'

type ChartTooltipProps = {
  active?: boolean
  payload: any
}

export default function AquariumTemperatureChartTooltip({ active, payload }: ChartTooltipProps) {
  let log, logData
  if (payload && payload[0]) {
    log = payload[0].payload
    logData =
      log.temperature >= 26 && log.temperature <= 29
        ? { iconStyle: 'bg-green-500', term: 'Ideal' }
        : log.temperature < 26
        ? { iconStyle: 'bg-blue-500', term: 'Fria' }
        : log.temperature > 29
        ? { iconStyle: 'bg-red-500', term: 'Quente' }
        : {}
  }

  return active && logData ? (
    <dl className="rounded p-2 bg-neutral-300/80 dark:bg-neutral-800/70 backdrop-blur filter dark:text-neutral-100 text-neutral-900 border justify-between border-gray-300 dark:border-neutral-800 transition-colors duration-200">
      <dt className="font-semibold">Temperatura</dt>
      <div className="flex items-center gap-x-2 ">
        <dd>{log.temperature.toFixed(1).replace('.', ',')} °C</dd>
        <div
          className={
            'h-[10px] w-[10px] rounded-full transition-colors duration-[2s] ' + logData.iconStyle
          }
        />
        {logData.term}
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
