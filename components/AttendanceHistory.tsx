"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { getTeacherAttendance } from "@/app/actions/attendance"
import { format } from "date-fns"

type AttendanceRecord = {
  id: string
  teacherId: string
  timestamp: string
  imageUrl: string
  location?: {
    latitude: number
    longitude: number
    verified: boolean
  }
  status: "pending" | "approved" | "rejected"
}

export function AttendanceHistory({ teacherId }: { teacherId: string }) {
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAttendance() {
      try {
        const data = await getTeacherAttendance(teacherId)
        setRecords(data)
      } catch (error) {
        console.error("Failed to load attendance history", error)
      } finally {
        setLoading(false)
      }
    }

    loadAttendance()
  }, [teacherId])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Pending
          </Badge>
        )
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
          <CardDescription>Loading your attendance history...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Attendance</CardTitle>
        <CardDescription>Your attendance history for the past 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        {records.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
            <p>No attendance records found</p>
            <p className="text-sm">Start recording your attendance to see your history here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {records.map((record) => (
              <div
                key={record.id}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="h-12 w-12 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                  {record.imageUrl.startsWith("data:image") ? (
                    <img
                      src={record.imageUrl || "/placeholder.svg"}
                      alt="Selfie"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    getStatusIcon(record.status)
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Attendance Recorded</h4>
                    {getStatusBadge(record.status)}
                  </div>

                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {format(new Date(record.timestamp), "MMM dd, yyyy")}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {format(new Date(record.timestamp), "h:mm a")}
                    </div>
                    {record.location && (
                      <div className="flex items-center">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {record.location.verified ? "On premises" : "Off premises"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

