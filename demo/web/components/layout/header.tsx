'use client'

import { Sora } from 'next/font/google'
import Link from 'next/link'
import { cn } from '@/library/utils'
import ThemeSelector from './theme'

const sora = Sora({ subsets: ['latin'] })

type HeaderProps = {
  subtreeName?: string
  subtreeUrl?: string
  showSubtreeSkeleton?: boolean
}

export default function Header({ subtreeName, subtreeUrl, showSubtreeSkeleton }: HeaderProps) {
  return (
    <header className="h-[15vh] sticky top-0 z-10 backdrop-filter text-sm w-screen backdrop-blur dark:text-neutral-100 text-neutral-900 border-b border-gray-300 dark:border-neutral-800 bg-transparent p-2 flex items-center justify-center">
      <div className="flex w-5/6 justify-between items-center text-base sm:text-xl font-semibold z-10">
        <div className="justify-start flex">
          <Link
            href="/"
            className={cn(
              'transition-colors duration-200 hover:text-neutral-500 dark:hover:text-neutral-500',
              sora.className
            )}
          >
            AquaDynamics
          </Link>
          {subtreeName && subtreeUrl && (
            <>
              <span className="px-1.5 md:px-3 text-neutral-300 dark:text-neutral-600">/</span>
              <Link
                href={subtreeUrl}
                className={cn(
                  'transition-colors duration-200 hover:text-neutral-500 dark:hover:text-neutral-500',
                  sora.className
                )}
              >
                {subtreeName}
              </Link>
            </>
          )}
          {showSubtreeSkeleton && (
            <>
              <span className="px-3 text-neutral-300 dark:text-neutral-600">/</span>
              <div className="h-8 bg-neutral-200 block dark:bg-neutral-800 rounded-sm w-20 md:w-40 animate-pulse" />
            </>
          )}
        </div>
        <ThemeSelector />
      </div>
    </header>
  )
}
