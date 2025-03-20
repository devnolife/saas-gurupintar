"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, ChevronLeft, ChevronRight, CalendarIcon, Clock, Users, MapPin, BookOpen } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"

// Mock events data
const events = [
  {
    id: 1,
    title: "Rapat Guru",
    date: new Date(2023, 10, 15),
    startTime: "08:00",
    endTime: "10:00",
    location: "Ruang Rapat Utama",
    type: "meeting",
    attendees: ["Semua Guru"],
  },
  {
    id: 2,
    title: "Upacara Bendera",
    date: new Date(2023, 10, 20),
    startTime: "07:30",
    endTime: "08:30",
    location: "Lapangan Utama",
    type: "ceremony",
    attendees: ["Semua Siswa", "Semua Guru"],
  },
  {
    id: 3,
    title: "Supervisi Kelas 9A",
    date: new Date(2023, 10, 22),
    startTime: "10:00",
    endTime: "11:30",
    location: "Kelas 9A",
    type: "supervision",
    attendees: ["Budi Santoso"],
  },
  {
    id: 4,
    title: "Evaluasi Kurikulum",
    date: new Date(2023, 10, 25),
    startTime: "13:00",
    endTime: "15:00",
    location: "Ruang Multimedia",
    type: "meeting",
    attendees: ["Tim Kurikulum", "Kepala Sekolah"],
  },
  {
    id: 5,
    title: "Kunjungan Dinas Pendidikan",
    date: new Date(2023, 10, 28),
    startTime: "09:00",
    endTime: "12:00",
    location: "Aula Sekolah",
    type: "visit",
    attendees: ["Kepala Sekolah", "Wakil Kepala Sekolah", "Guru Senior"],
  },
]

// Upcoming events (sorted by date)
const upcomingEvents = [...events]
  .sort((a, b) => a.date.getTime() - b.date.getTime())
  .filter((event) => event.date >= new Date())
  .slice(0, 3)

export default function HeadmasterCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)

  // Get events for the selected date
  const eventsForSelectedDate = date
    ? events.filter(
        (event) =>
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear(),
      )
    : []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold">Kalender Sekolah</h1>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Acara
          </Button>
        </div>
      </div>

      <Tabs defaultValue="calendar" className="space-y-8">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="calendar">Kalender</TabsTrigger>
          <TabsTrigger value="list">Daftar Acara</TabsTrigger>
          <TabsTrigger value="academic">Akademik</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{date && format(date, "MMMM yyyy", { locale: id })}</span>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (date) {
                            const prevMonth = new Date(date)
                            prevMonth.setMonth(prevMonth.getMonth() - 1)
                            setDate(prevMonth)
                          }
                        }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (date) {
                            const nextMonth = new Date(date)
                            nextMonth.setMonth(nextMonth.getMonth() + 1)
                            setDate(nextMonth)
                          }
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border-none"
                    modifiers={{
                      event: (date) =>
                        events.some(
                          (event) =>
                            event.date.getDate() === date.getDate() &&
                            event.date.getMonth() === date.getMonth() &&
                            event.date.getFullYear() === date.getFullYear(),
                        ),
                    }}
                    modifiersStyles={{
                      event: { fontWeight: "bold", color: "var(--primary)" },
                    }}
                  />
                </CardContent>
              </Card>

              {eventsForSelectedDate.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Acara pada {date && format(date, "EEEE, d MMMM yyyy", { locale: id })}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {eventsForSelectedDate.map((event) => (
                        <div
                          key={event.id}
                          className="p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors"
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{event.title}</h3>
                            <Badge
                              variant={
                                event.type === "meeting"
                                  ? "default"
                                  : event.type === "ceremony"
                                    ? "secondary"
                                    : event.type === "supervision"
                                      ? "outline"
                                      : "destructive"
                              }
                            >
                              {event.type === "meeting"
                                ? "Rapat"
                                : event.type === "ceremony"
                                  ? "Upacara"
                                  : event.type === "supervision"
                                    ? "Supervisi"
                                    : "Kunjungan"}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>
                                {event.startTime} - {event.endTime}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Acara Mendatang</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 border rounded-lg cursor-pointer hover:border-primary transition-colors"
                        onClick={() => {
                          setDate(event.date)
                          setSelectedEvent(event)
                        }}
                      >
                        <h3 className="font-medium text-sm">{event.title}</h3>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          <span>{format(event.date, "EEEE, d MMMM", { locale: id })}</span>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            {event.startTime} - {event.endTime}
                          </span>
                        </div>
                      </div>
                    ))}

                    {upcomingEvents.length === 0 && (
                      <p className="text-center py-6 text-sm text-muted-foreground">Tidak ada acara mendatang</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {selectedEvent && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>{selectedEvent.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
                        <span>{format(selectedEvent.date, "EEEE, d MMMM yyyy", { locale: id })}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        <span>
                          {selectedEvent.startTime} - {selectedEvent.endTime}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        <span>{selectedEvent.location}</span>
                      </div>
                      <div className="flex items-start">
                        <Users className="h-4 w-4 mr-2 text-primary mt-1" />
                        <div>
                          <p className="font-medium mb-1">Peserta:</p>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {selectedEvent.attendees.map((attendee: string, index: number) => (
                              <li key={index}>{attendee}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="w-full">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" className="w-full">
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Semua Acara</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors"
                    onClick={() => {
                      setDate(event.date)
                      setSelectedEvent(event)
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            <span>{format(event.date, "d MMMM yyyy", { locale: id })}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>
                              {event.startTime} - {event.endTime}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          event.type === "meeting"
                            ? "default"
                            : event.type === "ceremony"
                              ? "secondary"
                              : event.type === "supervision"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {event.type === "meeting"
                          ? "Rapat"
                          : event.type === "ceremony"
                            ? "Upacara"
                            : event.type === "supervision"
                              ? "Supervisi"
                              : "Kunjungan"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kalender Akademik</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    Semester Ganjil 2023/2024
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span>Awal Semester</span>
                      <span className="font-medium">17 Juli 2023</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Ujian Tengah Semester</span>
                      <span className="font-medium">25-30 September 2023</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Ujian Akhir Semester</span>
                      <span className="font-medium">4-9 Desember 2023</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Pembagian Rapor</span>
                      <span className="font-medium">23 Desember 2023</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Libur Semester</span>
                      <span className="font-medium">24 Des 2023 - 7 Jan 2024</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    Semester Genap 2023/2024
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span>Awal Semester</span>
                      <span className="font-medium">8 Januari 2024</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Ujian Tengah Semester</span>
                      <span className="font-medium">11-16 Maret 2024</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Ujian Nasional</span>
                      <span className="font-medium">15-22 April 2024</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Ujian Akhir Semester</span>
                      <span className="font-medium">3-8 Juni 2024</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Pembagian Rapor</span>
                      <span className="font-medium">15 Juni 2024</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    Kegiatan Sekolah Penting
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span>Peringatan Hari Kemerdekaan</span>
                      <span className="font-medium">17 Agustus 2023</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Peringatan Hari Guru</span>
                      <span className="font-medium">25 November 2023</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Pentas Seni Akhir Tahun</span>
                      <span className="font-medium">16 Desember 2023</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Pekan Olahraga Sekolah</span>
                      <span className="font-medium">20-25 Februari 2024</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Perpisahan Kelas 9</span>
                      <span className="font-medium">10 Juni 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

