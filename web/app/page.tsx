'use client'

import { Suspense } from 'react'

import { Header } from '@/components/layout/header'
import Aquariums from './components/aquariums'
import Loading from './loading'

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-y-auto overflow-x-hidden h-[80vh] w-screen">
        <div className="flex w-full h-full items-start justify-center sm:justify-around">
          <div className="w-5/6 columns-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-12 lg:gap-16 py-10 sm:py-20">
            <Suspense fallback={<Loading />}>
              <Aquariums />
            </Suspense>
          </div>
        </div>
      </main>
    </>
  )
}
