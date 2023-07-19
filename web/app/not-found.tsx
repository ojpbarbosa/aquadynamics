import Header from '@/components/layout/header'
import { Button } from '@/components/ui/button'

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
              '-mt-6 text-3xl sm:text-4xl font-serif font-semibold text-center ' +
              newsreader.className
            }
          >
            <span className="mr-2 dark:text-neutral-500 text-neutral-400">&ldquo;</span>
            Perder-se também é caminho.
            <span className="ml-2 dark:text-neutral-500 text-neutral-400">&rdquo;</span>
          </h1>
          <p className="font-semibold dark:text-neutral-500 text-neutral-400">
            — Clarice Lispector
          </p>
          <pre className={'mt-4 text-xl sm:text-2xl ' + spaceMono.className}>404</pre>
          <Button
            asChild
            variant="outline"
            className="rounded mt-2 bg-transparent dark:bg-transparent"
          >
            <Link href="/">Voltar para os aquários</Link>
          </Button>
        </div>
      </main>
    </>
  )
}
