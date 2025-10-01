'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" forcedTheme="dark" enableSystem={false}>
      {children}
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}

