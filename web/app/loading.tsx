import AquariumCardSkeleton from './components/aquarium-card-skeleton'

export default function Loading() {
  return Array(6)
    .fill(1)
    .map((_, index) => <AquariumCardSkeleton key={index} />)
}
