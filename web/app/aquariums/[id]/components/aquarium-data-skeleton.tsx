export default function AquariumDataSkeleton() {
  return (
    <main className="overflow-y-auto overflow-x-hidden h-[80vh] w-screen animate-pulse">
      <div className="flex w-screen h-full items-start justify-around">
        <div className="w-5/6 flex flex-col sm:flex-row justify-between gap-4 py-10 sm:py-20">
          <div className="aspect-video w-full sm:w-2/3 flex items-center justify-center bg-neutral-300/20 dark:bg-neutral-800/30 rounded border border-gray-300 dark:border-neutral-800"></div>
          <div className="flex flex-row sm:flex-col md:w-1/6 lg:w-1/3"></div>
        </div>
      </div>
    </main>
  )
}
