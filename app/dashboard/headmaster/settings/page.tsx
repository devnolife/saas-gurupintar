"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, BellRing, Building, FileUp, Mail, Phone, Shield, Eye, EyeOff, Globe, Map, Clock } from "lucide-react"

export default function HeadmasterSettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loaded, setLoaded] = useState(true)

  // Mock data for headmaster profile
  const headmaster = {
    name: "Dr. Hadi Wijaya",
    email: "hadi.wijaya@example.com",
    phone: "081234567890",
    position: "Kepala Sekolah",
    since: "2020-01-15",
    avatarUrl: "/placeholder.svg",
  }

  // Mock data for school profile
  const school = {
    name: "SMP Negeri 1 Contoh",
    address: "Jl. Pendidikan No. 123, Kota Contoh",
    phone: "021-12345678",
    email: "smpn1contoh@example.com",
    website: "www.smpn1contoh.sch.id",
    accreditation: "A",
    npsn: "12345678",
    principal: "Dr. Hadi Wijaya",
    established: "1985",
    district: "Kecamatan Contoh",
    city: "Kota Contoh",
    province: "Provinsi Contoh",
    postalCode: "12345",
  }

  if (!loaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-[50vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Loading Settings...</h2>
            <p className="text-muted-foreground">Please wait while we load your settings</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold">Pengaturan</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="school">Sekolah</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profil Kepala Sekolah</CardTitle>
              <CardDescription>Kelola informasi profil Anda sebagai kepala sekolah</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={headmaster.avatarUrl} alt={headmaster.name} />
                    <AvatarFallback>HW</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="mt-2">
                    <FileUp className="h-4 w-4 mr-2" />
                    Ganti Foto
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input id="name" defaultValue={headmaster.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Jabatan</Label>
                      <Input id="position" defaultValue={headmaster.position} readOnly className="bg-muted/50" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                          <Mail className="h-4 w-4" />
                        </span>
                        <Input id="email" className="rounded-l-none" defaultValue={headmaster.email} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                          <Phone className="h-4 w-4" />
                        </span>
                        <Input id="phone" className="rounded-l-none" defaultValue={headmaster.phone} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="since">Menjabat Sejak</Label>
                      <Input type="date" id="since" defaultValue={headmaster.since} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="education">Pendidikan Terakhir</Label>
                      <Select defaultValue="s3">
                        <SelectTrigger id="education">
                          <SelectValue placeholder="Pilih pendidikan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="s1">S1</SelectItem>
                          <SelectItem value="s2">S2</SelectItem>
                          <SelectItem value="s3">S3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografi Singkat</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tuliskan biografi singkat Anda"
                      defaultValue="Kepala sekolah dengan pengalaman lebih dari 15 tahun di bidang pendidikan. Berdedikasi untuk meningkatkan kualitas pengajaran dan pembelajaran di sekolah."
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Perubahan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="school" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profil Sekolah</CardTitle>
              <CardDescription>Kelola informasi dan identitas sekolah Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="school-name">Nama Sekolah</Label>
                    <Input id="school-name" defaultValue={school.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="npsn">NPSN</Label>
                    <Input id="npsn" defaultValue={school.npsn} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school-address">Alamat Sekolah</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      <Map className="h-4 w-4" />
                    </span>
                    <Input id="school-address" className="rounded-l-none" defaultValue={school.address} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="district">Kecamatan</Label>
                    <Input id="district" defaultValue={school.district} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Kota/Kabupaten</Label>
                    <Input id="city" defaultValue={school.city} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="province">Provinsi</Label>
                    <Input id="province" defaultValue={school.province} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="school-phone">Telepon</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        <Phone className="h-4 w-4" />
                      </span>
                      <Input id="school-phone" className="rounded-l-none" defaultValue={school.phone} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school-email">Email</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        <Mail className="h-4 w-4" />
                      </span>
                      <Input id="school-email" className="rounded-l-none" defaultValue={school.email} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school-website">Website</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        <Globe className="h-4 w-4" />
                      </span>
                      <Input id="school-website" className="rounded-l-none" defaultValue={school.website} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accreditation">Akreditasi</Label>
                    <Select defaultValue={school.accreditation}>
                      <SelectTrigger id="accreditation">
                        <SelectValue placeholder="Pilih akreditasi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="Belum">Belum Terakreditasi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="established">Tahun Berdiri</Label>
                    <Input id="established" defaultValue={school.established} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal-code">Kode Pos</Label>
                    <Input id="postal-code" defaultValue={school.postalCode} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school-description">Deskripsi Sekolah</Label>
                  <Textarea
                    id="school-description"
                    placeholder="Tuliskan deskripsi sekolah"
                    defaultValue="SMP Negeri 1 Contoh adalah sekolah menengah pertama unggulan yang berdedikasi untuk memberikan pendidikan berkualitas tinggi dengan pendekatan yang holistik dan inovatif."
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Logo Sekolah</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 border rounded-md flex items-center justify-center bg-muted overflow-hidden">
                      <Building className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <Button variant="outline">
                      <FileUp className="h-4 w-4 mr-2" />
                      Unggah Logo
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Perubahan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Keamanan Akun</CardTitle>
              <CardDescription>Kelola kata sandi dan pengaturan keamanan akun Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Kata Sandi Saat Ini</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan kata sandi saat ini"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">Kata Sandi Baru</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan kata sandi baru"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Konfirmasi Kata Sandi Baru</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Konfirmasi kata sandi baru"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Keamanan Tambahan</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Autentikasi Dua Faktor</Label>
                      <p className="text-sm text-muted-foreground">
                        Tingkatkan keamanan akun Anda dengan autentikasi dua faktor
                      </p>
                    </div>
                    <Button variant="outline">Aktifkan</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Perangkat yang Masuk</Label>
                      <p className="text-sm text-muted-foreground">Kelola perangkat yang saat ini masuk ke akun Anda</p>
                    </div>
                    <Button variant="outline">Kelola</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Riwayat Login</Label>
                      <p className="text-sm text-muted-foreground">
                        Lihat riwayat login terakhir untuk memantau aktivitas yang mencurigakan
                      </p>
                    </div>
                    <Button variant="outline">Lihat</Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Shield className="h-4 w-4 mr-2" />
                  Perbarui Keamanan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>Kelola cara Anda menerima pemberitahuan dari sistem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Umum</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="email-notif">
                          Notifikasi Email
                        </Label>
                        <p className="text-sm text-muted-foreground">Terima pemberitahuan melalui email</p>
                      </div>
                      <Switch id="email-notif" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="mobile-notif">
                          Notifikasi Seluler
                        </Label>
                        <p className="text-sm text-muted-foreground">Terima pemberitahuan di perangkat seluler Anda</p>
                      </div>
                      <Switch id="mobile-notif" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="browser-notif">
                          Notifikasi Browser
                        </Label>
                        <p className="text-sm text-muted-foreground">Terima notifikasi push di browser Anda</p>
                      </div>
                      <Switch id="browser-notif" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Jenis Notifikasi</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="report-notif">
                          Laporan
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Notifikasi tentang laporan baru atau yang perlu persetujuan
                        </p>
                      </div>
                      <Switch id="report-notif" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="attendance-notif">
                          Kehadiran
                        </Label>
                        <p className="text-sm text-muted-foreground">Notifikasi tentang kehadiran guru dan siswa</p>
                      </div>
                      <Switch id="attendance-notif" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="calendar-notif">
                          Kalender
                        </Label>
                        <p className="text-sm text-muted-foreground">Pengingat tentang acara mendatang dan pertemuan</p>
                      </div>
                      <Switch id="calendar-notif" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="curriculum-notif">
                          Kurikulum
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Notifikasi tentang perubahan atau persetujuan kurikulum
                        </p>
                      </div>
                      <Switch id="curriculum-notif" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="achievement-notif">
                          Prestasi
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Notifikasi tentang prestasi baru sekolah, guru, atau siswa
                        </p>
                      </div>
                      <Switch id="achievement-notif" defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Waktu Notifikasi</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="start-time">Waktu Mulai</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                            <Clock className="h-4 w-4" />
                          </span>
                          <Input id="start-time" type="time" className="rounded-l-none" defaultValue="08:00" />
                        </div>
                      </div>
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="end-time">Waktu Selesai</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                            <Clock className="h-4 w-4" />
                          </span>
                          <Input id="end-time" type="time" className="rounded-l-none" defaultValue="18:00" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="do-not-disturb">
                          Mode Jangan Ganggu
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Nonaktifkan semua notifikasi selama jam tertentu
                        </p>
                      </div>
                      <Switch id="do-not-disturb" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <BellRing className="h-4 w-4 mr-2" />
                  Simpan Preferensi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

