"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { School, Users, BookOpen, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const { toast } = useToast()
  const router = useRouter()

  const handleLogin = (role: string) => {
    toast({
      title: "Login Berhasil",
      description: `Selamat datang kembali, Anda masuk sebagai ${role}!`,
    })

    switch (role) {
      case "Admin":
        router.push("/dashboard/admin")
        break
      case "Operator":
        router.push("/dashboard/operator")
        break
      case "Teacher":
        router.push("/dashboard/teacher")
        break
    }
  }

  return (
    <div className="min-h-screen bg-gradient-soft dark:bg-gradient-soft-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-border/10 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Masuk ke Guru Pintar</CardTitle>
            <CardDescription>Pilih peran untuk melanjutkan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="grid gap-4">
              <Button
                onClick={() => handleLogin("Admin")}
                className="h-14 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white hover:opacity-90 transition-opacity"
              >
                <School className="mr-2 h-5 w-5" />
                <span className="flex-1 text-left">Masuk sebagai Admin</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                onClick={() => handleLogin("Operator")}
                className="h-14 rounded-xl bg-gradient-to-r from-secondary to-secondary-light text-white hover:opacity-90 transition-opacity"
              >
                <Users className="mr-2 h-5 w-5" />
                <span className="flex-1 text-left">Masuk sebagai Operator</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                onClick={() => handleLogin("Teacher")}
                className="h-14 rounded-xl bg-gradient-to-r from-accent to-accent-light text-white hover:opacity-90 transition-opacity"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                <span className="flex-1 text-left">Masuk sebagai Guru</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Belum punya akun?{" "}
                <Link href="/register" className="text-primary font-semibold hover:underline">
                  Daftar di sini
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

