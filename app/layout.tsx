import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Guru Pintar - Aplikasi Perencanaan Pembelajaran",
  description: "Aplikasi perencanaan pembelajaran yang memudahkan guru dalam membuat RPP.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
