export default function AquariumCardSkeleton() {
  return (
    <div className="h-60 rounded dark:text-neutral-100/80 animate-pulse text-neutral-900 border justify-around border-gray-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/30 flex flex-col items-start">
      <div className="w-full"></div>
      <div className="border-t border-gray-300 dark:border-neutral-800 w-full p-4 h-10">
        <div className="h-4 bg-gray-200 block dark:bg-neutral-700 rounded-sm w-32" />
      </div>
    </div>
  )
}
