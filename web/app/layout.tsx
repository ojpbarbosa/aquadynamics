import { Footer } from '@/components/layout/footer'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aquadynamics'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-[95vh]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
