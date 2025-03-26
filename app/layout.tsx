import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MockApiProvider } from "@/providers/mock-api-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Guru Pintar - AI-Powered Teaching Assistant",
  description: "Guru Pintar helps teachers create lesson plans, syllabi, and educational materials using AI.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MockApiProvider>{children}</MockApiProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'