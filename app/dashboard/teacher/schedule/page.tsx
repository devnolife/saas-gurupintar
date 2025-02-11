"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const schedule = [
  { id: 1, day: "Monday", time: "09:00 AM - 10:30 AM", subject: "Mathematics", class: "9A" },
  { id: 2, day: "Monday", time: "11:00 AM - 12:30 PM", subject: "Science", class: "10B" },
  { id: 3, day: "Tuesday", time: "09:00 AM - 10:30 AM", subject: "History", class: "11C" },
  { id: 4, day: "Tuesday", time: "11:00 AM - 12:30 PM", subject: "English", class: "9A" },
  { id: 5, day: "Wednesday", time: "09:00 AM - 10:30 AM", subject: "Mathematics", class: "10B" },
]

export default function SchedulePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Schedule</h1>
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Class
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.day}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{item.subject}</TableCell>
                  <TableCell>{item.class}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
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

