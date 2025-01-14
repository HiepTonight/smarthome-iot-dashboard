// import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
// import './globals.css'
import { ThemeProvider } from "../../context/ThemeProvider"

// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Voltex - Smart Home Automation',
//   description: 'Transform your home with intelligent automation',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}