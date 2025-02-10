"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface AdminSettings {
  name: string
  email: string
  password: string
  notificationsEnabled: boolean
  theme: string
  language: string
  maxOperatorsPerSchool: number
}

const initialSettings: AdminSettings = {
  name: "Admin Utama",
  email: "admin@gurupintar.com",
  password: "",
  notificationsEnabled: true,
  theme: "light",
  language: "id",
  maxOperatorsPerSchool: 5,
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings>(initialSettings)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setSettings((prev) => ({ ...prev, notificationsEnabled: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    alert("Pengaturan berhasil disimpan!")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Pengaturan Admin</h1>

      <form onSubmit={handleSubmit}>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Informasi Akun</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input id="name" name="name" value={settings.name} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={settings.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Ubah Kata Sandi</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={settings.password}
                onChange={handleInputChange}
                placeholder="Biarkan kosong jika tidak ingin mengubah"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Preferensi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Notifikasi Email</Label>
              <Switch id="notifications" checked={settings.notificationsEnabled} onCheckedChange={handleSwitchChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="theme">Tema</Label>
              <Select value={settings.theme} onValueChange={(value) => handleSelectChange("theme", value)}>
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Pilih tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Terang</SelectItem>
                  <SelectItem value="dark">Gelap</SelectItem>
                  <SelectItem value="system">Sistem</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Bahasa</Label>
              <Select value={settings.language} onValueChange={(value) => handleSelectChange("language", value)}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Pilih bahasa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pengaturan Sistem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxOperatorsPerSchool">Maksimum Operator per Sekolah</Label>
              <Input
                id="maxOperatorsPerSchool"
                name="maxOperatorsPerSchool"
                type="number"
                value={settings.maxOperatorsPerSchool}
                onChange={handleInputChange}
                min={1}
                required
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              "Simpan Pengaturan"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

