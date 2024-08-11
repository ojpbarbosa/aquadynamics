import Header from '@/components/layout/header'
import AquariumCardSkeleton from './components/aquarium-card/aquarium-card-skeleton'

export default function Loading() {
  return (
    <>
      <Header />
      <main className="overflow-y-auto overflow-x-hidden h-[80vh] w-screen">
        <div className="flex w-full h-full items-start justify-center sm:justify-around">
          <div className="w-5/6 columns-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-12 lg:gap-16 py-14 pb-24 sm:pb-0">
            {Array(3)
              .fill(1)
              .map((_, index) => (
                <AquariumCardSkeleton key={index} />
              ))}
          </div>
        </div>
      </main>
    </>
  )
}
