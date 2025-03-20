"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Search, Filter, UserPlus, Key, Edit, Lock, Mail, AlertTriangle, CheckCircle2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock teacher account data
const teacherAccounts = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Senior Teacher",
    status: "Active",
    lastLogin: "2023-07-01T10:30:00",
    createdAt: "2022-03-15",
    permissions: ["create_rpp", "view_students", "upload_materials"],
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Teacher",
    status: "Active",
    lastLogin: "2023-07-02T09:15:00",
    createdAt: "2022-04-10",
    permissions: ["create_rpp", "view_students"],
  },
  {
    id: 3,
    name: "Carol Williams",
    email: "carol@example.com",
    role: "Teacher",
    status: "Active",
    lastLogin: "2023-06-30T14:45:00",
    createdAt: "2022-05-05",
    permissions: ["create_rpp", "view_students", "upload_materials"],
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    role: "Teacher",
    status: "Inactive",
    lastLogin: "2023-05-20T11:20:00",
    createdAt: "2022-06-15",
    permissions: ["create_rpp", "view_students"],
  },
  {
    id: 5,
    name: "Eva Garcia",
    email: "eva@example.com",
    role: "Senior Teacher",
    status: "Active",
    lastLogin: "2023-07-03T08:50:00",
    createdAt: "2022-07-01",
    permissions: ["create_rpp", "view_students", "upload_materials", "manage_curriculum"],
  },
]

// Available permissions
const availablePermissions = [
  { id: "create_rpp", label: "Create Lesson Plans (RPP)" },
  { id: "view_students", label: "View Student Information" },
  { id: "upload_materials", label: "Upload Teaching Materials" },
  { id: "manage_curriculum", label: "Manage Curriculum" },
  { id: "view_reports", label: "View Reports" },
  { id: "export_data", label: "Export Data" },
]

export default function AccountsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false)
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false)
  const [editedTeacher, setEditedTeacher] = useState<any>(null)
  const [teacherPermissions, setTeacherPermissions] = useState<string[]>([])

  // Filter teachers based on search term and status
  const filteredTeachers = teacherAccounts.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || teacher.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const handleEditTeacher = (teacher: any) => {
    setSelectedTeacher(teacher)
    setEditedTeacher({ ...teacher })
    setShowEditDialog(true)
  }

  const handleResetPassword = (teacher: any) => {
    setSelectedTeacher(teacher)
    setShowResetPasswordDialog(true)
  }

  const handleManagePermissions = (teacher: any) => {
    setSelectedTeacher(teacher)
    setTeacherPermissions([...teacher.permissions])
    setShowPermissionsDialog(true)
  }

  const handleSaveEdit = () => {
    toast({
      title: "Account Updated",
      description: `${editedTeacher.name}'s account has been updated successfully.`,
    })
    setShowEditDialog(false)
  }

  const handleResetPasswordConfirm = () => {
    toast({
      title: "Password Reset",
      description: `A password reset link has been sent to ${selectedTeacher.email}.`,
    })
    setShowResetPasswordDialog(false)
  }

  const handleSavePermissions = () => {
    toast({
      title: "Permissions Updated",
      description: `Permissions for ${selectedTeacher.name} have been updated successfully.`,
    })
    setShowPermissionsDialog(false)
  }

  const togglePermission = (permissionId: string) => {
    setTeacherPermissions((prev) =>
      prev.includes(permissionId) ? prev.filter((id) => id !== permissionId) : [...prev, permissionId],
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Teacher Account Management</h1>

      <Tabs defaultValue="accounts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        {/* Accounts Tab */}
        <TabsContent value="accounts">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle>Teacher Accounts</CardTitle>
                  <CardDescription>Manage teacher accounts and permissions</CardDescription>
                </div>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New Teacher
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Search className="text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search accounts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>{teacher.name}</TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>{teacher.role}</TableCell>
                      <TableCell>
                        <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>{teacher.status}</Badge>
                      </TableCell>
                      <TableCell>{formatDate(teacher.lastLogin)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditTeacher(teacher)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleResetPassword(teacher)}>
                            <Key className="h-4 w-4 mr-2" />
                            Reset
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleManagePermissions(teacher)}>
                            <Lock className="h-4 w-4 mr-2" />
                            Permissions
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Edit Teacher Dialog */}
          {editedTeacher && (
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Teacher Account</DialogTitle>
                  <DialogDescription>Update account information for {selectedTeacher?.name}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={editedTeacher.name}
                      onChange={(e) => setEditedTeacher({ ...editedTeacher, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedTeacher.email}
                      onChange={(e) => setEditedTeacher({ ...editedTeacher, email: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={editedTeacher.role}
                      onValueChange={(value) => setEditedTeacher({ ...editedTeacher, role: value })}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Teacher">Teacher</SelectItem>
                        <SelectItem value="Senior Teacher">Senior Teacher</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="status">Account Status</Label>
                    <div className="flex-1"></div>
                    <Switch
                      id="status"
                      checked={editedTeacher.status === "Active"}
                      onCheckedChange={(checked) =>
                        setEditedTeacher({ ...editedTeacher, status: checked ? "Active" : "Inactive" })
                      }
                    />
                    <Label htmlFor="status" className="text-sm text-muted-foreground">
                      {editedTeacher.status}
                    </Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEdit}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {/* Reset Password Dialog */}
          {selectedTeacher && (
            <Dialog open={showResetPasswordDialog} onOpenChange={setShowResetPasswordDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reset Password</DialogTitle>
                  <DialogDescription>Send a password reset link to {selectedTeacher.email}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="flex items-center p-3 bg-amber-50 text-amber-800 rounded-md">
                    <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p className="text-sm">
                      This will invalidate the current password and send a reset link to the teacher's email address.
                    </p>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="reset-email">Email Address</Label>
                    <div className="flex mt-2">
                      <Input id="reset-email" value={selectedTeacher.email} readOnly className="flex-1" />
                      <Button variant="outline" size="sm" className="ml-2">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowResetPasswordDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleResetPasswordConfirm}>Send Reset Link</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {/* Permissions Dialog */}
          {selectedTeacher && (
            <Dialog open={showPermissionsDialog} onOpenChange={setShowPermissionsDialog}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Manage Permissions</DialogTitle>
                  <DialogDescription>Set permissions for {selectedTeacher.name}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    {availablePermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Switch
                          id={`permission-${permission.id}`}
                          checked={teacherPermissions.includes(permission.id)}
                          onCheckedChange={() => togglePermission(permission.id)}
                        />
                        <Label htmlFor={`permission-${permission.id}`}>{permission.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowPermissionsDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSavePermissions}>Save Permissions</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        {/* Invitations Tab */}
        <TabsContent value="invitations">
          <Card>
            <CardHeader>
              <CardTitle>Pending Invitations</CardTitle>
              <CardDescription>Manage teacher account invitations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">2 pending invitations</p>
                <Button>
                  <Mail className="h-4 w-4 mr-2" />
                  Send New Invitation
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Invited On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>frank@example.com</TableCell>
                    <TableCell>Teacher</TableCell>
                    <TableCell>July 1, 2023</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        Pending
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          Resend
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>grace@example.com</TableCell>
                    <TableCell>Senior Teacher</TableCell>
                    <TableCell>July 2, 2023</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        Pending
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          Resend
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Account Activity Log</CardTitle>
              <CardDescription>Recent account activities and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4 py-1">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <h3 className="font-medium">Password Reset</h3>
                    <span className="ml-auto text-sm text-muted-foreground">July 3, 2023 - 10:15 AM</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Password reset link sent to <span className="font-medium">david@example.com</span>
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-1">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="font-medium">Account Updated</h3>
                    <span className="ml-auto text-sm text-muted-foreground">July 2, 2023 - 2:30 PM</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Updated account details for <span className="font-medium">Alice Johnson</span>
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4 py-1">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-purple-500 mr-2" />
                    <h3 className="font-medium">Permissions Changed</h3>
                    <span className="ml-auto text-sm text-muted-foreground">July 1, 2023 - 11:45 AM</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Updated permissions for <span className="font-medium">Eva Garcia</span>
                  </p>
                </div>

                <div className="border-l-4 border-amber-500 pl-4 py-1">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2" />
                    <h3 className="font-medium">Invitation Sent</h3>
                    <span className="ml-auto text-sm text-muted-foreground">July 1, 2023 - 9:20 AM</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sent invitation to <span className="font-medium">frank@example.com</span>
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4 py-1">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-red-500 mr-2" />
                    <h3 className="font-medium">Account Status Changed</h3>
                    <span className="ml-auto text-sm text-muted-foreground">June 30, 2023 - 3:10 PM</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Changed status to <span className="font-medium">Inactive</span> for{" "}
                    <span className="font-medium">David Brown</span>
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Load More Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

