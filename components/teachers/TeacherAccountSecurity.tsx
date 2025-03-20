"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TeacherAccountSecurityProps {
  teacherId: number
  teacherName: string
}

export function TeacherAccountSecurity({ teacherId, teacherName }: TeacherAccountSecurityProps) {
  const { toast } = useToast()

  // Mock login history data
  const loginHistory = [
    {
      id: 1,
      date: "2023-07-01T10:30:00",
      ip: "192.168.1.1",
      device: "Chrome on Windows",
      location: "Jakarta, Indonesia",
      status: "Success",
    },
    {
      id: 2,
      date: "2023-06-28T14:15:00",
      ip: "192.168.1.1",
      device: "Chrome on Windows",
      location: "Jakarta, Indonesia",
      status: "Success",
    },
    {
      id: 3,
      date: "2023-06-25T09:45:00",
      ip: "192.168.1.1",
      device: "Safari on iPhone",
      location: "Jakarta, Indonesia",
      status: "Success",
    },
  ]

  const handleForceLogout = () => {
    toast({
      title: "Force Logout Successful",
      description: `${teacherName} has been logged out from all devices`,
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Login Activity</CardTitle>
          <CardDescription>Last 3 login attempts for {teacherName}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginHistory.map((login) => (
                <TableRow key={login.id}>
                  <TableCell>{formatDate(login.date)}</TableCell>
                  <TableCell>{login.device}</TableCell>
                  <TableCell>{login.location}</TableCell>
                  <TableCell>
                    <Badge variant={login.status === "Success" ? "default" : "destructive"}>{login.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4">
            <Button variant="outline" size="sm" className="w-full" onClick={handleForceLogout}>
              Force Logout All Devices
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>Two-Factor Authentication</AlertTitle>
            <AlertDescription>Enable two-factor authentication for enhanced account security.</AlertDescription>
          </Alert>

          <Alert>
            <Lock className="h-4 w-4" />
            <AlertTitle>Password Update</AlertTitle>
            <AlertDescription>This account's password hasn't been changed in over 90 days.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

