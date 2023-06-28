export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-5xl items-center justify-center text-sm lg:flex">
        <div className="flex justify-center items-center before:absolute before:h-10 before:w-48 sm:before:h-16 sm:before:w-64 before:rounded-full before:bg-gradient-conic before:blur-2xl before:from-green-500 before:to-blue-700 dark:before:from-green-400 dark:before:to-blue-600 dark:before:opacity-80">
          <p className="text-4xl sm:text-5xl font-bold z-10">Aquadynamics</p>
        </div>
      </div>
    </main>
  )
}
