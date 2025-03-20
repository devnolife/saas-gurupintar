"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  LineChart,
  RefreshCw,
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  GraduationCap,
  Activity,
  BookOpen,
  Calendar,
} from "lucide-react"

export default function HeadmasterAnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold">Analitik Sekolah</h1>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Perbarui
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Unduh Laporan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Kehadiran Guru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">92%</div>
              <div className="ml-2 flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+2.5%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Dibandingkan bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Kehadiran Siswa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">88%</div>
              <div className="ml-2 flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+1.2%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Dibandingkan bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">78.5</div>
              <div className="ml-2 flex items-center text-sm text-red-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span>-1.8%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Dibandingkan semester lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Kelengkapan RPP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">86%</div>
              <div className="ml-2 flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+5.3%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">42 dari 48 RPP lengkap</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-8">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="performance">Performa</TabsTrigger>
          <TabsTrigger value="attendance">Kehadiran</TabsTrigger>
          <TabsTrigger value="curriculum">Kurikulum</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Perbandingan Nilai Per Kelas</CardTitle>
              <CardDescription>Rata-rata nilai ujian per kelas dalam semester ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/30 rounded-md">
                <div className="text-center">
                  <BarChart className="h-10 w-10 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Grafik perbandingan nilai akan ditampilkan di sini
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <h4 className="text-sm font-medium">Kelas 7</h4>
                  <p className="text-lg font-bold mt-1">76.8</p>
                  <p className="text-xs text-muted-foreground">3 kelas</p>
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-medium">Kelas 8</h4>
                  <p className="text-lg font-bold mt-1">78.2</p>
                  <p className="text-xs text-muted-foreground">3 kelas</p>
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-medium">Kelas 9</h4>
                  <p className="text-lg font-bold mt-1">80.5</p>
                  <p className="text-xs text-muted-foreground">3 kelas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mata Pelajaran Terbaik</CardTitle>
                <CardDescription>Berdasarkan rata-rata nilai</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-10 bg-green-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium">Bahasa Inggris</p>
                        <p className="text-xs text-muted-foreground">Dewi Lestari</p>
                      </div>
                    </div>
                    <p className="font-bold">85.7</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-10 bg-blue-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium">Matematika</p>
                        <p className="text-xs text-muted-foreground">Budi Santoso</p>
                      </div>
                    </div>
                    <p className="font-bold">83.2</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-10 bg-purple-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium">Pendidikan Agama</p>
                        <p className="text-xs text-muted-foreground">Ahmad Hidayat</p>
                      </div>
                    </div>
                    <p className="font-bold">82.8</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mata Pelajaran Perlu Perhatian</CardTitle>
                <CardDescription>Berdasarkan rata-rata nilai</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-10 bg-red-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium">Fisika</p>
                        <p className="text-xs text-muted-foreground">Eko Prasetyo</p>
                      </div>
                    </div>
                    <p className="font-bold">68.5</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-10 bg-amber-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium">Kimia</p>
                        <p className="text-xs text-muted-foreground">Siti Rahayu</p>
                      </div>
                    </div>
                    <p className="font-bold">71.3</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-10 bg-yellow-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium">Sejarah</p>
                        <p className="text-xs text-muted-foreground">Agus Widodo</p>
                      </div>
                    </div>
                    <p className="font-bold">72.9</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tren Kehadiran</CardTitle>
              <CardDescription>Persentase kehadiran dalam 6 bulan terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/30 rounded-md">
                <div className="text-center">
                  <LineChart className="h-10 w-10 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Grafik tren kehadiran akan ditampilkan di sini</p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm font-medium mr-2">Guru:</span>
                  <span className="text-sm">92% rata-rata</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm font-medium mr-2">Siswa:</span>
                  <span className="text-sm">88% rata-rata</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Guru dengan Kehadiran Terbaik</CardTitle>
                <CardDescription>Semester ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Dewi Lestari</p>
                        <p className="text-xs text-muted-foreground">Bahasa Inggris</p>
                      </div>
                    </div>
                    <p className="font-bold">100%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Budi Santoso</p>
                        <p className="text-xs text-muted-foreground">Matematika</p>
                      </div>
                    </div>
                    <p className="font-bold">98%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Ahmad Hidayat</p>
                        <p className="text-xs text-muted-foreground">Pendidikan Agama</p>
                      </div>
                    </div>
                    <p className="font-bold">97%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kelas dengan Kehadiran Terbaik</CardTitle>
                <CardDescription>Semester ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Kelas 9A</p>
                        <p className="text-xs text-muted-foreground">32 siswa</p>
                      </div>
                    </div>
                    <p className="font-bold">96%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Kelas 8B</p>
                        <p className="text-xs text-muted-foreground">30 siswa</p>
                      </div>
                    </div>
                    <p className="font-bold">94%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Kelas 7A</p>
                        <p className="text-xs text-muted-foreground">33 siswa</p>
                      </div>
                    </div>
                    <p className="font-bold">93%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="curriculum" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Perkembangan Kurikulum</CardTitle>
              <CardDescription>Status implementasi kurikulum saat ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/30 rounded-md">
                <div className="text-center">
                  <Activity className="h-10 w-10 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Grafik perkembangan kurikulum akan ditampilkan di sini
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <BookOpen className="h-8 w-8 text-primary mb-2" />
                      <h3 className="text-lg font-bold">86%</h3>
                      <p className="text-sm text-muted-foreground">RPP Selesai</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <Calendar className="h-8 w-8 text-primary mb-2" />
                      <h3 className="text-lg font-bold">92%</h3>
                      <p className="text-sm text-muted-foreground">Silabus Selesai</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <Activity className="h-8 w-8 text-primary mb-2" />
                      <h3 className="text-lg font-bold">78%</h3>
                      <p className="text-sm text-muted-foreground">Materi Selesai</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rekomendasi Perbaikan Kurikulum</CardTitle>
                <CardDescription>Berdasarkan analisis performa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Penyesuaian Kurikulum Fisika</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Berdasarkan rata-rata nilai yang rendah, perlu dilakukan penyesuaian pada pendekatan pengajaran
                      dan materi pembelajaran Fisika untuk meningkatkan pemahaman siswa.
                    </p>
                    <Button size="sm">Lihat Detail</Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Pelatihan Guru Mapel Kimia</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Guru mata pelajaran Kimia memerlukan pelatihan tambahan untuk meningkatkan metode pengajaran yang
                      lebih interaktif dan menarik untuk siswa.
                    </p>
                    <Button size="sm">Lihat Detail</Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Pengembangan Materi Sejarah</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Materi pembelajaran Sejarah perlu dikembangkan dengan pendekatan yang lebih kontekstual dan
                      melibatkan penggunaan teknologi multimedia.
                    </p>
                    <Button size="sm">Lihat Detail</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

