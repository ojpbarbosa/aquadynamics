import { ReactNode } from 'react'
import { Inter } from 'next/font/google'

import Footer from '@/components/layout/footer'
import WebSocketProvider from '@/contexts/websocket-context'
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
      <body
        className={
          'overflow-hidden h-screen flex flex-col items-center justify-between ' + inter.className
        }
      >
        <WebSocketProvider>{children}</WebSocketProvider>
        <Footer />
      </body>
    </html>
  )
}
