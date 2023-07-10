import Header from '@/components/layout/header'

import { Newsreader, Space_Mono } from 'next/font/google'
import Link from 'next/link'

const newsreader = Newsreader({ style: 'italic', subsets: ['latin'] })
const spaceMono = Space_Mono({ weight: '400', subsets: ['latin'] })

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="overflow-y-auto overflow-x-hidden h-[80vh] w-screen">
        <div className="flex flex-col h-full items-center justify-center gap-y-2">
          <h1
            className={
              'text-2xl sm:text-4xl font-serif font-semibold text-center ' + newsreader.className
            }
          >
            <span className="mr-2 dark:text-neutral-500 text-neutral-400">&ldquo;</span>
            Perder-se também é caminho.
            <span className="ml-2 dark:text-neutral-500 text-neutral-400">&rdquo;</span>
          </h1>
          <p className="sm:ml-72 ml-48 text-sm sm:text-base font-semibold dark:text-neutral-500 text-neutral-400">
            — Clarice Lispector
          </p>
          <pre className={'mt-4 text-lg sm:text-2xl ' + spaceMono.className}>404</pre>
          <Link
            href="/"
            className="mt-2 py-2 px-4 bg-neutral-300/20 hover:bg-transparent dark:bg-neutral-800/30 rounded dark:text-neutral-100 text-neutral-900 border justify-between border-gray-300 dark:border-neutral-800 hover:bg-neutral-100 transition-colors duration-200 hover:dark:bg-neutral-800/30"
          >
            Voltar para os aquários
          </Link>
        </div>
      </main>
    </>
  )
}
