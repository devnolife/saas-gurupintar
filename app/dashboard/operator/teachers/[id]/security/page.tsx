"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, AlertCircle, Shield, Lock, LogOut, RefreshCw } from "lucide-react"

// Mock teacher data
const getTeacherById = (id) => {
  return {
    id: Number.parseInt(id),
    name: "Alice Johnson",
    email: "alice@example.com",
    loginHistory: [
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
      {
        id: 4,
        date: "2023-06-20T16:30:00",
        ip: "203.0.113.1",
        device: "Firefox on MacOS",
        location: "Bandung, Indonesia",
        status: "Failed",
      },
      {
        id: 5,
        date: "2023-06-18T11:20:00",
        ip: "192.168.1.1",
        device: "Chrome on Windows",
        location: "Jakarta, Indonesia",
        status: "Success",
      },
    ],
    securitySettings: {
      twoFactorEnabled: false,
      passwordLastChanged: "2023-05-15T08:00:00",
      sessionTimeout: 30, // minutes
      loginNotifications: true,
      deviceManagement: true,
    },
  }
}

export default function TeacherSecurityPage() {
  const params = useParams()
  const router = useRouter()
  const teacherId = params.id
  const teacher = getTeacherById(teacherId)
  const { toast } = useToast()

  const [securitySettings, setSecuritySettings] = useState(teacher.securitySettings)

  const handleSettingChange = (setting, value) => {
    setSecuritySettings((prev) => ({ ...prev, [setting]: value }))

    // In a real app, this would call an API to update the setting
    toast({
      title: "Security Setting Updated",
      description: `${setting} has been ${value ? "enabled" : "disabled"} for ${teacher.name}`,
    })
  }

  const handleForceLogout = () => {
    // In a real app, this would call an API to force logout
    toast({
      title: "Force Logout Successful",
      description: `${teacher.name} has been logged out from all devices`,
    })
  }

  const handleSessionReset = () => {
    // In a real app, this would call an API to reset sessions
    toast({
      title: "Sessions Reset",
      description: `All sessions for ${teacher.name} have been reset`,
    })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Account Security</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Login History</CardTitle>
              <CardDescription>Recent login attempts for {teacher.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teacher.loginHistory.map((login) => (
                    <TableRow key={login.id}>
                      <TableCell>{formatDate(login.date)}</TableCell>
                      <TableCell>{login.device}</TableCell>
                      <TableCell>{login.location}</TableCell>
                      <TableCell>{login.ip}</TableCell>
                      <TableCell>
                        <Badge variant={login.status === "Success" ? "default" : "destructive"}>{login.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage security settings for {teacher.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">Require a verification code in addition to password</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={securitySettings.twoFactorEnabled}
                    onCheckedChange={(checked) => handleSettingChange("twoFactorEnabled", checked)}
                    id="two-factor"
                  />
                  <Label htmlFor="two-factor" className="text-sm">
                    {securitySettings.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </Label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Login Notifications</h3>
                  <p className="text-sm text-muted-foreground">Send email notifications for new login attempts</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={securitySettings.loginNotifications}
                    onCheckedChange={(checked) => handleSettingChange("loginNotifications", checked)}
                    id="login-notifications"
                  />
                  <Label htmlFor="login-notifications" className="text-sm">
                    {securitySettings.loginNotifications ? "Enabled" : "Disabled"}
                  </Label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Device Management</h3>
                  <p className="text-sm text-muted-foreground">Allow teacher to manage their logged-in devices</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={securitySettings.deviceManagement}
                    onCheckedChange={(checked) => handleSettingChange("deviceManagement", checked)}
                    id="device-management"
                  />
                  <Label htmlFor="device-management" className="text-sm">
                    {securitySettings.deviceManagement ? "Enabled" : "Disabled"}
                  </Label>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Password Last Changed</h3>
                <p className="text-sm text-muted-foreground">{formatDate(securitySettings.passwordLastChanged)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Session Management</CardTitle>
              <CardDescription>Manage active sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" onClick={handleForceLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Force Logout All Devices
              </Button>

              <Button variant="outline" className="w-full" onClick={handleSessionReset}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset All Sessions
              </Button>

              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>
                  Forcing logout will immediately terminate all active sessions. The teacher will need to log in again.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Enable Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">Increase account security with 2FA</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Lock className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Regular Password Changes</h3>
                  <p className="text-sm text-muted-foreground">Encourage changing password every 90 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

