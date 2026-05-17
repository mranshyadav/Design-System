'use client'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CommandPalette } from '@/components/layout/CommandPalette'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDocPage = Boolean(pathname?.match(/^\/components\/[^/]+$/))

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {!isDocPage && <CommandPalette />}
          {!isDocPage && <Navbar />}
          <main className={isDocPage ? 'overflow-hidden h-screen' : undefined}>
            {children}
          </main>
          {!isDocPage && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  )
}
