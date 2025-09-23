import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The American AI Agent Company - Enterprise AI Automation',
  description: 'We\'ve analyzed 2,046 enterprise workflows to build the definitive catalog of AI agents for American businesses. Drive competitiveness through intelligent automation.',
  keywords: 'AI agents, business automation, enterprise AI, workflow automation, American business',
  authors: [{ name: 'The American AI Agent Company' }],
  openGraph: {
    title: 'The American AI Agent Company',
    description: 'Enterprise AI agents built from 2,046 analyzed workflows',
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