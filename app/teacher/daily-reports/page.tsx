"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarIcon, Check, Clock, Download, Plus, UserCheck } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { FeatureProtection } from "@/components/FeatureProtection"

// Sample report data
const recentReports = [
  { 
    id: "1", 
    date: "2023-10-15", 
    title: "Kelas Matematika 10A", 
    topic: "Persamaan Kuadrat", 
    status: "completed" 
  },
  { 
    id: "2", 
    date: "2023-10-14", 
    title: "Kelas Fisika 11B", 
    topic: "Hukum Newton", 
    status: "completed" 
  },
  { 
    id: "3", 
    date: "2023-10-13", 
    title: "Kelas Matematika 10A", 
    topic: "Fungsi Trigonometri", 
    status: "completed" 
  },
  { 
    id: "4", 
    date: "2023-10-12", 
    title: "Kelas Fisika 11B", 
    topic: "Termodinamika", 
    status: "completed" 
  },
]

export default function DailyReportsPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [title, setTitle] = useState("")
  const [classGroup, setClassGroup] = useState("")
  const [topic, setTopic] = useState("")
  const [objective, setObjective] = useState("")
  const [activities, setActivities] = useState("")
  const [outcomes, setOutcomes] = useState("")
  const [challenges, setChallenges] = useState("")
  const [followUp, setFollowUp] = useState("")

  // In a real app, get this from auth context
  const teacherId = "teacher4" // Should match the ID in TeacherSidebar

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the form data to your API
    
    toast({
      title: "Laporan berhasil disimpan",
      description: "Laporan kegiatan harian Anda telah disimpan dengan sukses.",
    })

    // Reset form
    setTitle("")
    setClassGroup("")
    setTopic("")
    setObjective("")
    setActivities("")
    setOutcomes("")
    setChallenges("")
    setFollowUp("")
  }

  const ReportsContent = () => (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            Laporan Kegiatan Harian
          </h1>
          <p className="text-muted-foreground mt-1">Catat dan dokumentasikan kegiatan mengajar harian Anda</p>
        </div>
        <Button
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          onClick={() => {}}
        >
          <Download className="h-4 w-4" />
          Ekspor Laporan
        </Button>
      </div>

      <Tabs defaultValue="create" className="space-y-4">
        <TabsList>
          <TabsTrigger value="create">Buat Laporan Baru</TabsTrigger>
          <TabsTrigger value="history">Riwayat Laporan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Kegiatan Harian Baru</CardTitle>
              <CardDescription>
                Isi formulir di bawah ini untuk mencatat kegiatan mengajar hari ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Tanggal</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pilih tanggal</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(date) => date && setDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Laporan</Label>
                    <Input 
                      id="title" 
                      placeholder="Masukkan judul laporan" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Kelas</Label>
                    <Input 
                      id="class" 
                      placeholder="Contoh: 10A, 11B, dll." 
                      value={classGroup}
                      onChange={(e) => setClassGroup(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topik Pembelajaran</Label>
                    <Input 
                      id="topic" 
                      placeholder="Masukkan topik" 
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objective">Tujuan Pembelajaran</Label>
                  <Textarea 
                    id="objective" 
                    placeholder="Tuliskan tujuan pembelajaran hari ini" 
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activities">Kegiatan Pembelajaran</Label>
                  <Textarea 
                    id="activities" 
                    placeholder="Jelaskan aktivitas pembelajaran yang dilakukan" 
                    className="min-h-32"
                    value={activities}
                    onChange={(e) => setActivities(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outcomes">Hasil Pembelajaran</Label>
                  <Textarea 
                    id="outcomes" 
                    placeholder="Tuliskan hasil/capaian pembelajaran hari ini" 
                    value={outcomes}
                    onChange={(e) => setOutcomes(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="challenges">Kendala/Tantangan</Label>
                    <Textarea 
                      id="challenges" 
                      placeholder="Sebutkan tantangan yang dihadapi" 
                      value={challenges}
                      onChange={(e) => setChallenges(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="followUp">Tindak Lanjut</Label>
                    <Textarea 
                      id="followUp" 
                      placeholder="Rencana tindak lanjut untuk pertemuan berikutnya" 
                      value={followUp}
                      onChange={(e) => setFollowUp(e.target.value)}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">Simpan Laporan</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Laporan Kegiatan</CardTitle>
              <CardDescription>
                Daftar laporan kegiatan harian yang telah Anda buat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between border-b pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{report.date}</span>
                      </div>
                      <h4 className="font-medium">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">Topik: {report.topic}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Lihat
                      </Button>
                      <Button variant="outline" size="sm">
                        Unduh
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Laporan Sebelumnya</Button>
              <Button variant="outline">Laporan Berikutnya</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <FeatureProtection feature="daily_reports" teacherId={teacherId}>
      <ReportsContent />
    </FeatureProtection>
  );
} 