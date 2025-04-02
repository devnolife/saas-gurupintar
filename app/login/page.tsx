"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { setUserSession } from "@/lib/auth"
import { School, User, Users, Crown, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (role: string) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create a mock user based on role
      const user = {
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        name:
          role === "admin"
            ? "Admin User"
            : role === "operator"
              ? "Operator User"
              : role === "teacher"
                ? "Teacher User"
                : role === "headmaster"
                  ? "Dr. Hadi Wijaya"
                  : "Student User",
        email: email || `${role}@example.com`,
        role:
          role === "admin"
            ? "admin"
            : role === "operator"
              ? "operator"
              : role === "teacher"
                ? "teacher"
                : role === "headmaster"
                  ? "headmaster"
                  : "student",
      }

      // Set user session
      setUserSession(user)

      // Show success message
      toast({
        title: "Login berhasil ✨",
        description: `Anda telah masuk sebagai ${role}.`,
      })

      // Redirect based on role
      if (role === "admin") {
        router.push("/dashboard/admin")
      } else if (role === "operator") {
        router.push("/dashboard/operator")
      } else if (role === "teacher") {
        router.push("/dashboard/teacher")
      } else if (role === "headmaster") {
        router.push("/dashboard/headmaster")
      } else {
        router.push("/dashboard/student")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login gagal",
        description: "Terjadi kesalahan saat login. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const roles = [
    { id: "admin", name: "Admin", icon: User, color: "from-blue-600 to-blue-400" },
    { id: "operator", name: "Operator", icon: User, color: "from-green-600 to-green-400" },
    { id: "teacher", name: "Guru", icon: Users, color: "from-amber-600 to-amber-400" },
    { id: "headmaster", name: "Kepala Sekolah", icon: Crown, color: "from-purple-600 to-purple-400" },
    { id: "student", name: "Siswa", icon: User, color: "from-pink-600 to-pink-400" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <School className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
            Guru Pintar
          </span>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">Kembali ke Beranda</Link>
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Selamat Datang Kembali! 👋</h1>
            <p className="text-muted-foreground">Masuk ke akun Anda untuk melanjutkan perjalanan belajar</p>
          </div>

          {/* Login Card */}
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-0 shadow-lg rounded-2xl overflow-hidden">
            <div className="p-6">
              {/* Role Selection */}
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-3 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-primary" />
                  Pilih Peran Anda
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={cn(
                        "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200",
                        "hover:scale-105 hover:shadow-md",
                        selectedRole === role.id
                          ? `bg-gradient-to-br ${role.color} text-white ring-2 ring-offset-2 ring-primary/50`
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
                      )}
                    >
                      <role.icon
                        className={cn("h-6 w-6 mb-2", selectedRole === role.id ? "text-white" : "text-primary")}
                      />
                      <span className="text-xs font-medium">{role.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-slate-900 px-2 text-muted-foreground">atau login dengan email</span>
                </div>
              </div>

              {/* Email & Password Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@sekolah.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Link href="#" className="text-xs text-primary hover:underline">
                      Lupa password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  />
                </div>

                {/* Login Button */}
                <Button
                  className="w-full h-12 mt-2 font-medium"
                  onClick={() => handleLogin(selectedRole || "student")}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Masuk
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Belum memiliki akun?{" "}
              <Link href="/register" className="text-primary font-medium hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
        <p>© 2025 Guru Pintar. All rights reserved.</p>
      </footer>
    </div>
  )
}

