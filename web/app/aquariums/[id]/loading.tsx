import { PiSpinnerGapLight } from 'react-icons/pi'

import Header from '@/components/layout/header'

export default function Loading() {
  return (
    <>
      <Header showSubtreeSkeleton />
      <main className="overflow-y-auto overflow-x-hidden h-[80vh] w-screen">
        <div className="flex w-full h-full items-center justify-center">
          <PiSpinnerGapLight className="text-4xl animate-spin text-neutral-500" />
        </div>
      </main>
    </>
  )
}
