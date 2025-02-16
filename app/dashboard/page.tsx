"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    // In a real application, you would fetch the user data from your state management solution or local storage
    const fakeUser = { name: "Budi Santoso" }
    setUser(fakeUser)
  }, [])

  const handleLogout = () => {
    // In a real application, you would clear the user data from your state management solution or local storage
    router.push("/auth/login")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-white flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 space-y-6 max-w-md w-full">
        <h1 className="text-3xl font-bold text-primary text-center">Selamat Datang di Dashboard</h1>
        <p className="text-gray-600 text-center">Halo, {user.name}! Anda telah berhasil masuk.</p>
        <Button
          onClick={handleLogout}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Keluar
        </Button>
      </div>
    </div>
  )
}
