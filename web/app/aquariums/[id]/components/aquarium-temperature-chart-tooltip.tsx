type ChartTooltipProps = {
  active?: boolean
  payload: any
}

export default function AquariumTemperatureChartTooltip({ active, payload }: ChartTooltipProps) {
  return active ? (
    <dl className="rounded p-2 bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 text-neutral-900 border justify-between border-gray-300 dark:border-neutral-800 transition-colors duration-200">
      <dt className="font-semibold">Temperatura</dt>
      <dd>{payload[0].payload.temperature.toFixed(1).replace('.', ',')} °C</dd>
      <dd>{payload[0].payload.timestamp}</dd>
    </dl>
  ) : null
}
