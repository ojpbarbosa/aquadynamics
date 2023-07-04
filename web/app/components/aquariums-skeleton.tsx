import AquariumCardSkeleton from './aquarium-card-skeleton'

export default function AquariumsSkeleton() {
  return Array(6)
    .fill(1)
    .map((_, index) => <AquariumCardSkeleton key={index} />)
}
