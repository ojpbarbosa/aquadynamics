type ChartTooltipProps = {
  active?: boolean
  term: string
  value: string | number
  timestamp: string
}

export default function ChartTooltip({ active, term, value, timestamp }: ChartTooltipProps) {
  return active ? (
    <dl className="rounded p-2 bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 text-neutral-900 border justify-between border-gray-300 dark:border-neutral-800 transition-colors duration-200">
      <dt className="font-semibold">{term}</dt>
      <dd>{value}</dd>
      <dd>{timestamp}</dd>
    </dl>
  ) : null
}
