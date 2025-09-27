import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gold Star Workflows AI Agents - Enterprise AI Automation',
  description: 'We\'ve built and deployed over 2,056 AI agents that eliminate manual work. We help businesses deploy these proven AI systems to solve real business problems.',
  keywords: 'AI agents, business automation, enterprise AI, workflow automation, Gold Star Workflows',
  authors: [{ name: 'Gold Star Workflows AI Agents' }],
  openGraph: {
    title: 'Gold Star Workflows AI Agents',
    description: 'AI agents that eliminate manual work - built from 2,056 proven workflows',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}