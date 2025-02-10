"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus, Search } from "lucide-react"

interface ScheduleItem {
  id: number
  day: string
  startTime: string
  endTime: string
  subject: string
  grade: string
}

const mockSchedule: ScheduleItem[] = [
  { id: 1, day: "Senin", startTime: "08:00", endTime: "09:30", subject: "Matematika", grade: "1" },
  { id: 2, day: "Senin", startTime: "10:00", endTime: "11:30", subject: "Bahasa Indonesia", grade: "2" },
  { id: 3, day: "Selasa", startTime: "08:00", endTime: "09:30", subject: "IPA", grade: "3" },
  { id: 4, day: "Rabu", startTime: "10:00", endTime: "11:30", subject: "IPS", grade: "1" },
  { id: 5, day: "Kamis", startTime: "08:00", endTime: "09:30", subject: "Matematika", grade: "2" },
]

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"]

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(mockSchedule)
  const [searchTerm, setSearchTerm] = useState("")
  const [newScheduleItem, setNewScheduleItem] = useState({
    day: "",
    startTime: "",
    endTime: "",
    subject: "",
    grade: "",
  })

  const filteredSchedule = schedule.filter(
    (item) =>
      item.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.grade.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddScheduleItem = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = Math.max(...schedule.map((item) => item.id)) + 1
    const scheduleItem: ScheduleItem = {
      ...newScheduleItem,
      id: newId,
    }
    setSchedule([...schedule, scheduleItem])
    setNewScheduleItem({ day: "", startTime: "", endTime: "", subject: "", grade: "" })
  }

  const handleDeleteScheduleItem = (id: number) => {
    setSchedule(schedule.filter((item) => item.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Jadwal Mengajar</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tambah Jadwal Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddScheduleItem} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="day">Hari</Label>
                <Select
                  value={newScheduleItem.day}
                  onValueChange={(value) => setNewScheduleItem({ ...newScheduleItem, day: value })}
                  required
                >
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Pilih hari" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime">Waktu Mulai</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newScheduleItem.startTime}
                  onChange={(e) => setNewScheduleItem({ ...newScheduleItem, startTime: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">Waktu Selesai</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newScheduleItem.endTime}
                  onChange={(e) => setNewScheduleItem({ ...newScheduleItem, endTime: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Mata Pelajaran</Label>
                <Input
                  id="subject"
                  value={newScheduleItem.subject}
                  onChange={(e) => setNewScheduleItem({ ...newScheduleItem, subject: e.target.value })}
                  placeholder="Masukkan nama mata pelajaran"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Kelas</Label>
                <Select
                  value={newScheduleItem.grade}
                  onValueChange={(value) => setNewScheduleItem({ ...newScheduleItem, grade: value })}
                  required
                >
                  <SelectTrigger id="grade">
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((gradeNum) => (
                      <SelectItem key={gradeNum} value={gradeNum.toString()}>
                        Kelas {gradeNum}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Jadwal
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Jadwal Mengajar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari jadwal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableCaption>Jadwal mengajar mingguan</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Hari</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedule.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.day}</TableCell>
                  <TableCell>{`${item.startTime} - ${item.endTime}`}</TableCell>
                  <TableCell>{item.subject}</TableCell>
                  <TableCell>{item.grade}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteScheduleItem(item.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

