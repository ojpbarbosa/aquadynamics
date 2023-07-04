import { Sora } from 'next/font/google'
import Link from 'next/link'

const sora = Sora({ subsets: ['latin'] })

export function Header() {
  return (
    <header className="h-[15vh] sticky top-0 text-sm w-screen backdrop-blur dark:text-neutral-100 text-neutral-900 border-b border-gray-300 dark:border-neutral-800 bg-transparent p-2 flex items-center justify-center">
      {/* before:absolute before:h-8 before:w-28 sm:before:h-8 sm:before:w-32 before:rounded-full before:bg-gradient-conic before:blur-2xl before:from-green-500 before:to-blue-700 dark:before:from-green-400 dark:before:to-blue-600 dark:before:opacity-80 */}
      <div className="flex w-5/6 justify-start items-center">
        <p className="text-lg sm:text-xl font-semibold z-10">
          <Link href="/" className={sora.className}>
            AquaDynamics
          </Link>
        </p>
      </div>
    </header>
  )
}
