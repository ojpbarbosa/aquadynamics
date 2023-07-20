type AquariumCardDetailProps = {
  term: string
  value: string
  className?: string
  bulletColor: string
}

export default function AquariumCardDetail({
  term,
  value,
  className = '',
  bulletColor
}: AquariumCardDetailProps) {
  return (
    <div className={'flex flex-col gap-y-1 sm:gap-y-2 ' + className}>
      <dt className="dark:text-neutral-400 text-neutral-500 font-semibold">{term}</dt>
      <div className="flex items-center gap-x-2">
        <div
          style={{ backgroundColor: bulletColor, transition: 'ease', transitionDuration: '1s' }}
          className="h-[10px] w-[10px] rounded-full"
        />
        <dd>{value}</dd>
      </div>
    </div>
  )
}
