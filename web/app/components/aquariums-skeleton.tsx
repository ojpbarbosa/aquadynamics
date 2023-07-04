import AquariumCardSkeleton from './aquarium-card-skeleton'

export default function AquariumsSkeleton() {
  const aquariums = Array.from({ length: 8 }).fill(<AquariumCardSkeleton />)

  return <>{aquariums.map((aquarium) => aquarium)}</>
}
