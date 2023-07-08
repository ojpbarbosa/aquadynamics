import AquariumCardSkeleton from './components/aquarium-card-skeleton'

export default function Loading() {
  return Array(3)
    .fill(1)
    .map((_, index) => <AquariumCardSkeleton key={index} />)
}
