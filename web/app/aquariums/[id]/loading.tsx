import { Header } from '@/components/layout/header'

export default function Loading() {
  return (
    <>
      <Header />
      <main className="overflow-y-auto overflow-x-hidden h-[80vh] w-screen">
        <div className="flex w-screen h-full items-start justify-around">
          <div className="w-5/6 flex flex-col sm:flex-row gap-4 pt-20">
            <div>id</div>
            <div>Controller status: aquariumControllerStatus</div>
            <h1 className="text-6xl font-semibold">aquariumLog?.temperature °C</h1>
            <h1 className="text-6xl font-semibold">pH aquariumLog?.pH</h1>
          </div>
        </div>
      </main>
    </>
  )
}
