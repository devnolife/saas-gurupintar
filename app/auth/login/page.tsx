"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    toast({
      title: "Login Berhasil",
      description: "Selamat datang kembali di Guru Pintar!",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white shadow-2xl rounded-3xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary">Masuk ke Guru Pintar</h1>
            <p className="text-gray-600 mt-2">Lanjutkan perjalanan mengajar Anda</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@sekolah.com"
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Kata Sandi</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...
                </>
              ) : (
                "Masuk"
              )}
            </Button>
          </form>
          <div className="text-center">
            <Link href="/forgot-password" className="text-primary hover:underline">
              Lupa kata sandi?
            </Link>
          </div>
          <div className="border-t border-gray-300 pt-4">
            <p className="text-center text-gray-600">
              Belum punya akun?{" "}
              <Link href="/register" className="text-primary font-semibold hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

