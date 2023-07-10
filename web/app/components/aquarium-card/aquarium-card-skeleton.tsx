export default function AquariumCardSkeleton() {
  return (
    <div className="rounded animate-pulse border justify-between border-gray-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/30 flex flex-col items-start">
      <div className="w-full aspect-video bg-neutral-300/20 dark:bg-neutral-800/30 flex-col" />
      <div className="border-t border-gray-300 dark:border-neutral-800 w-full flex flex-col justify-between p-4 gap-y-2 h-44 sm:h-48 2xl:h-32">
        <div className="h-6 bg-neutral-200 block dark:bg-neutral-800 rounded w-1/2 sm:w-2/5" />

        <div className="grid grid-cols-2 2xl:grid-cols-3 gap-y-1 sm:gap-y-2 gap-x-4">
          <div className="flex flex-col gap-y-1 sm:gap-y-2">
            <div className="bg-neutral-200 dark:bg-neutral-800 h-6 w-[5.25rem] rounded" />
            <div className="flex items-center gap-x-2">
              <div className="h-[10px] w-[10px] rounded-full bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-20" />
            </div>
          </div>
          <div className="flex flex-col gap-y-1 sm:gap-y-2">
            <div className="bg-neutral-200 dark:bg-neutral-800 h-6 w-[6.25rem] rounded" />
            <div className="flex items-center gap-x-2">
              <div className="h-[10px] w-[10px] rounded-full bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-16" />
            </div>
          </div>
          <div className="flex flex-col gap-y-1 sm:gap-y-2">
            <div className="bg-neutral-200 dark:bg-neutral-800 h-6 w-6 rounded" />
            <div className="flex items-center gap-x-2">
              <div className="h-[10px] w-[10px] rounded-full bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-7" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
