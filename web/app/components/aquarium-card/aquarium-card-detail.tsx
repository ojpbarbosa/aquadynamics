type AquariumCardDetailProps = {
  term: string
  value: string | number
  className?: string
  iconStyle: string
}

export default function AquariumCardDetail({
  term,
  value,
  className = '',
  iconStyle
}: AquariumCardDetailProps) {
  return (
    <div className={'flex flex-col gap-y-1 sm:gap-y-2 ' + className}>
      <dt className="dark:text-neutral-500 text-neutral-400">{term}</dt>
      <div className="flex items-center gap-x-2">
        <div
          className={'h-[10px] w-[10px] rounded-full transition-colors duration-[2s] ' + iconStyle}
        />
        <dd>{value}</dd>
      </div>
    </div>
  )
}
