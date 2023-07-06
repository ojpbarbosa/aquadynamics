import { Header } from '@/components/layout/header'
import AquariumDataSkeleton from './[id]/components/aquarium-data-skeleton'

export default function Loading() {
  return (
    <>
      <Header showSubtreeSkeleton />
      <AquariumDataSkeleton />
    </>
  )
}
