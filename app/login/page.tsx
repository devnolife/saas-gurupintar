/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const fakeAccounts = [
  { role: "Admin", username: "admin1", password: "admin123" },
  { role: "Operator", username: "operator1", password: "operator123" },
  { role: "Teacher", username: "teacher1", password: "teacher123" },
]

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username Anda"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                Hubungi admin
              </Link>
            </p>
          </div>

          {/* Fake Account Credentials Table */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-center mb-4">Akun Demo (Hanya untuk Pengembangan)</h2>
            <Table>
              <TableCaption>Gunakan akun-akun ini untuk testing. Akan dihapus saat produksi.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Password</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fakeAccounts.map((account, index) => (
                  <TableRow key={index}>
                    <TableCell>{account.role}</TableCell>
                    <TableCell>{account.username}</TableCell>
                    <TableCell>{account.password}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

