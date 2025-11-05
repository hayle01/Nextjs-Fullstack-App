import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NextAuthProvider from './_components/providers/NextAuthProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Saasify',
  description: 'An Ai Powered Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
      <body className={inter.className}>{children}</body>
      </NextAuthProvider>
    </html>
  )
}