import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Guru Pintar - Perencanaan Pembelajaran yang Efektif",
  description:
    "Guru Pintar membantu guru menciptakan pengalaman belajar yang luar biasa melalui perencanaan pembelajaran yang efektif dan kolaboratif.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

