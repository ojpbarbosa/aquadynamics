export default function AquariumCardSkeleton() {
  return (
    <div className="h-60 sm:h-64 rounded animate-pulse border justify-between border-gray-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/30 flex flex-col items-start">
      <div className="w-full h-40 flex items-center justify-center bg-neutral-300/20 dark:bg-neutral-800/30 flex-col gap-y-2" />
      <div className="border-t border-gray-300 dark:border-neutral-800 w-full flex flex-col justify-between p-4 h-24">
        <div className="h-6 bg-gray-200 block dark:bg-neutral-800 rounded-sm w-32" />
        <div className="w-full flex items-center justify-end gap-x-2">
          <div className="h-6 sm:h-8 bg-gray-200 block dark:bg-neutral-800 rounded-sm w-6 sm:w-8" />
          <div className="h-6 sm:h-8 bg-gray-200 block dark:bg-neutral-800 rounded-sm w-14 sm:w-16" />
          <div className="h-6 sm:h-8 bg-gray-200 block dark:bg-neutral-800 rounded-sm w-16" />
        </div>
      </div>
    </div>
  )
}
