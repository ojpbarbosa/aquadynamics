import { Sora } from 'next/font/google'
import Link from 'next/link'

const sora = Sora({ subsets: ['latin'] })

type HeaderProps = {
  subtreeName?: string
  subtreeUrl?: string
  showSubtreeSkeleton?: boolean
}

export function Header({ subtreeName, subtreeUrl, showSubtreeSkeleton }: HeaderProps) {
  return (
    <header className="h-[15vh] sticky top-0 z-10 backdrop-filter text-sm w-screen backdrop-blur dark:text-neutral-100 text-neutral-900 border-b border-gray-300 dark:border-neutral-800 bg-transparent p-2 flex items-center justify-center">
      <div className="flex w-5/6 justify-start items-center text-lg sm:text-xl font-semibold z-10">
        <Link href="/" className={sora.className}>
          AquaDynamics
        </Link>
        {subtreeName && subtreeUrl && (
          <>
            <span className="px-3 text-gray-300 dark:text-neutral-600">/</span>
            <Link href={subtreeUrl} className={sora.className}>
              {subtreeName}
            </Link>
          </>
        )}
        {showSubtreeSkeleton && (
          <>
            <span className="px-3 text-gray-300 dark:text-neutral-600">/</span>
            <div className="h-6 bg-gray-200 block dark:bg-neutral-800 rounded-sm w-28 animate-pulse" />
          </>
        )}
      </div>
    </header>
  )
}
