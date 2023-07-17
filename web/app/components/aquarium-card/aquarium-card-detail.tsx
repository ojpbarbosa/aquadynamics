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
    <div className={'flex flex-col gap-y-1 sm:gap-y-2 text-sm sm:text-base ' + className}>
      <dt className="dark:text-neutral-500 text-neutral-400">{term}</dt>
      <div className="flex items-center gap-x-2">
        <div
          className={
            'h-[10px] w-[10px] rounded-full transition-colors duration-[2s] ' + bulletColor
          }
        />
        <dd>{value}</dd>
      </div>
    </div>
  )
}
