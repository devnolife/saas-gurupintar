"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, Clock, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const schedule = [
  { id: 1, day: "Monday", time: "09:00 AM - 10:30 AM", subject: "Mathematics", class: "9A", room: "Room 101" },
  { id: 2, day: "Monday", time: "11:00 AM - 12:30 PM", subject: "Science", class: "10B", room: "Lab 2" },
  { id: 3, day: "Tuesday", time: "09:00 AM - 10:30 AM", subject: "History", class: "11C", room: "Room 205" },
  { id: 4, day: "Tuesday", time: "11:00 AM - 12:30 PM", subject: "English", class: "9A", room: "Room 103" },
  { id: 5, day: "Wednesday", time: "09:00 AM - 10:30 AM", subject: "Mathematics", class: "10B", room: "Room 101" },
  { id: 6, day: "Wednesday", time: "11:00 AM - 12:30 PM", subject: "Physics", class: "11A", room: "Lab 1" },
  { id: 7, day: "Thursday", time: "09:00 AM - 10:30 AM", subject: "Chemistry", class: "10C", room: "Lab 3" },
  { id: 8, day: "Thursday", time: "11:00 AM - 12:30 PM", subject: "Biology", class: "11B", room: "Lab 2" },
  { id: 9, day: "Friday", time: "09:00 AM - 10:30 AM", subject: "Geography", class: "9C", room: "Room 202" },
  { id: 10, day: "Friday", time: "11:00 AM - 12:30 PM", subject: "Art", class: "10A", room: "Art Studio" },
]

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState<string>("all")
  const [currentWeek, setCurrentWeek] = useState<string>("May 13 - May 17, 2024")

  const filteredSchedule = selectedDay === "all" ? schedule : schedule.filter((item) => item.day === selectedDay)

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            Schedule
          </h1>
          <p className="text-muted-foreground mt-1">Manage your weekly teaching schedule</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Class
        </Button>
      </div>

      <Card className="border-primary/20 mb-8">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Weekly Schedule
              </CardTitle>
              <CardDescription>View and manage your teaching schedule</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm font-medium">{currentWeek}</div>
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-6" onValueChange={setSelectedDay}>
            <TabsList className="grid grid-cols-6">
              <TabsTrigger value="all">All Days</TabsTrigger>
              {days.map((day) => (
                <TabsTrigger key={day} value={day}>
                  {day.substring(0, 3)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchedule.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {item.day}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {item.time}
                    </TableCell>
                    <TableCell className="font-medium">{item.subject}</TableCell>
                    <TableCell>{item.class}</TableCell>
                    <TableCell>{item.room}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedule.slice(0, 3).map((item) => (
                <div
                  key={`upcoming-${item.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div>
                    <div className="font-medium">{item.subject}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.class} • {item.room}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{item.day}</div>
                    <div className="text-xs text-muted-foreground">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Schedule Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
                <div className="text-sm text-blue-600 dark:text-blue-400">Total Classes</div>
                <div className="text-2xl font-bold">{schedule.length}</div>
              </div>
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900">
                <div className="text-sm text-green-600 dark:text-green-400">Classes per Week</div>
                <div className="text-2xl font-bold">5</div>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900">
                <div className="text-sm text-purple-600 dark:text-purple-400">Subjects Taught</div>
                <div className="text-2xl font-bold">6</div>
              </div>
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900">
                <div className="text-sm text-amber-600 dark:text-amber-400">Teaching Hours</div>
                <div className="text-2xl font-bold">15</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

