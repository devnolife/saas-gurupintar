"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Save } from "lucide-react"

interface AdminSettings {
  // General Settings
  siteName: string
  siteDescription: string
  maintenanceMode: boolean

  // Security Settings
  passwordMinLength: number
  twoFactorAuth: boolean
  sessionTimeout: number

  // Notification Settings
  emailNotifications: boolean
  pushNotifications: boolean
  notificationFrequency: string

  // Customization Settings
  primaryColor: string
  logoUrl: string
  customCss: string
}

const initialSettings: AdminSettings = {
  siteName: "Guru Pintar Admin",
  siteDescription: "Platform manajemen sekolah terpadu",
  maintenanceMode: false,
  passwordMinLength: 8,
  twoFactorAuth: true,
  sessionTimeout: 30,
  emailNotifications: true,
  pushNotifications: false,
  notificationFrequency: "daily",
  primaryColor: "#3b82f6",
  logoUrl: "/logo.png",
  customCss: "",
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings>(initialSettings)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: keyof AdminSettings) => {
    setSettings((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const handleSelectChange = (name: keyof AdminSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    toast({
      title: "Pengaturan berhasil disimpan",
      description: "Perubahan telah diterapkan ke sistem.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Pengaturan Admin</h1>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Umum</TabsTrigger>
            <TabsTrigger value="security">Keamanan</TabsTrigger>
            <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
            <TabsTrigger value="customization">Kustomisasi</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Umum</CardTitle>
                <CardDescription>Konfigurasi pengaturan dasar sistem</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nama Situs</Label>
                  <Input id="siteName" name="siteName" value={settings.siteName} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Deskripsi Situs</Label>
                  <Textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={settings.siteDescription}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mode Pemeliharaan</Label>
                    <p className="text-sm text-muted-foreground">Aktifkan mode pemeliharaan situs</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={() => handleSwitchChange("maintenanceMode")}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Keamanan</CardTitle>
                <CardDescription>Konfigurasi keamanan dan autentikasi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Panjang Minimal Password</Label>
                  <Input
                    id="passwordMinLength"
                    name="passwordMinLength"
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autentikasi Dua Faktor</Label>
                    <p className="text-sm text-muted-foreground">
                      Wajibkan autentikasi dua faktor untuk semua pengguna
                    </p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={() => handleSwitchChange("twoFactorAuth")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Timeout Sesi (menit)</Label>
                  <Input
                    id="sessionTimeout"
                    name="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Notifikasi</CardTitle>
                <CardDescription>Atur preferensi notifikasi sistem</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifikasi Email</Label>
                    <p className="text-sm text-muted-foreground">Aktifkan notifikasi melalui email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={() => handleSwitchChange("emailNotifications")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifikasi Push</Label>
                    <p className="text-sm text-muted-foreground">Aktifkan notifikasi push di browser</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={() => handleSwitchChange("pushNotifications")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notificationFrequency">Frekuensi Notifikasi</Label>
                  <Select
                    value={settings.notificationFrequency}
                    onValueChange={(value) => handleSelectChange("notificationFrequency", value)}
                  >
                    <SelectTrigger id="notificationFrequency">
                      <SelectValue placeholder="Pilih frekuensi notifikasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Realtime</SelectItem>
                      <SelectItem value="daily">Harian</SelectItem>
                      <SelectItem value="weekly">Mingguan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customization">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Kustomisasi</CardTitle>
                <CardDescription>Sesuaikan tampilan dan nuansa platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Warna Utama</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="primaryColor"
                      name="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={handleInputChange}
                      className="w-12 h-12 p-1"
                    />
                    <Input
                      type="text"
                      value={settings.primaryColor}
                      onChange={handleInputChange}
                      name="primaryColor"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">URL Logo</Label>
                  <Input id="logoUrl" name="logoUrl" value={settings.logoUrl} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customCss">CSS Kustom</Label>
                  <Textarea
                    id="customCss"
                    name="customCss"
                    value={settings.customCss}
                    onChange={handleInputChange}
                    placeholder="Masukkan CSS kustom Anda di sini"
                    className="font-mono"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Simpan Pengaturan
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

