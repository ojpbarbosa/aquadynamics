import { ReactNode } from 'react'
import { Inter } from 'next/font/google'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import WebSocketProvider from './context/websocket-context'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AquaDynamics'
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <body className={'overflow-hidden ' + inter.className}>
        <Header />
        <WebSocketProvider>
          <main className="overflow-y-auto overflow-x-hidden h-[80vh] max-h-[85vh]">
            {children}
          </main>
        </WebSocketProvider>
        <Footer />
      </body>
    </html>
  )
}
