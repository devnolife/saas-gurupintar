/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Fungsi untuk login dengan kredensial spesifik (admin/operator/guru)
  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Login Berhasil",
          description: `Selamat datang kembali, ${data.user.name}!`,
        })
        switch (data.user.role) {
          case "admin":
            router.push("/dashboard/admin")
            break
          case "operator":
            router.push("/dashboard/operator")
            break
          case "teacher":
          case "guru":
            router.push("/dashboard/teacher")
            break
          default:
            router.push("/dashboard")
        }
      } else {
        toast({
          title: "Login Gagal",
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mencoba login. Silakan coba lagi.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
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

          {/* Tiga tombol untuk Login */}
          <div className="flex flex-col space-y-4 mt-8">
            <Button
              onClick={() => handleLogin("admin1", "admin123")}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...
                </>
              ) : (
                "Login sebagai Admin"
              )}
            </Button>
            <Button
              onClick={() => handleLogin("operator1", "operator123")}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...
                </>
              ) : (
                "Login sebagai Operator"
              )}
            </Button>
            <Button
              onClick={() => handleLogin("guru1", "guru123")}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...
                </>
              ) : (
                "Login sebagai Guru"
              )}
            </Button>
          </div>

          <div className="text-center mt-8">
            <Link href="/forgot-password" className="text-primary hover:underline">
              Lupa kata sandi?
            </Link>
          </div>

          <div className="border-t border-gray-300 pt-4">
            <p className="text-center text-gray-600">
              Belum punya akun?{" "}
              <Link href="/register" className="text-primary font-semibold hover:underline">
                Hubungi admin
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
