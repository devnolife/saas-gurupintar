"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { TeacherRPPGenerator } from "@/components/teachers/TeacherRPPGenerator"
import { TeacherChangeHistory } from "@/components/teachers/TeacherChangeHistory"
import { AlertCircle, Mail, ShieldAlert, Edit, Save, X, History, ArrowLeft } from "lucide-react"
import { TeacherSyllabusGenerator } from "@/components/teachers/TeacherSyllabusGenerator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock teacher data
const getTeacherById = (id) => {
  return {
    id: Number.parseInt(id),
    name: "David Brown",
    email: "david@example.com",
    subject: "History",
    classes: 3,
    phone: "+62 878-8765-4321",
    joinDate: "2022-08-05",
    status: "Inactive",
    lastLogin: "2023-06-15T11:20:00",
    accountType: "Standard",
    documentQuota: {
      used: 25,
      total: 50,
    },
    profileImage: "/placeholder.svg?height=100&width=100",
    qualifications: ["Ph.D. History, University of Jakarta", "Certified Teacher, Level 3"],
    address: "Jl. Kuningan No. 28, Jakarta",
    education: "Ph.D. History",
    bio: "Experienced history teacher with a passion for making historical events relevant to today's students. Specializes in Indonesian history and world civilizations.",
    dateOfBirth: "1985-04-12",
    emergencyContact: {
      name: "Sarah Brown",
      relationship: "Spouse",
      phone: "+62 878-1234-5678",
    },
    classes: [
      { id: 1, name: "Class 10A", students: 28, subject: "World History" },
      { id: 2, name: "Class 11B", students: 30, subject: "Indonesian History" },
      { id: 3, name: "Class 12C", students: 25, subject: "Historical Analysis" },
    ],
    changeHistory: [
      {
        id: 1,
        date: "2023-06-10T09:15:00",
        user: "Admin User",
        changes: [{ field: "Status", oldValue: "Active", newValue: "Inactive" }],
      },
      {
        id: 2,
        date: "2023-05-20T14:30:00",
        user: "System",
        changes: [{ field: "Email", oldValue: "david.brown@example.com", newValue: "david@example.com" }],
      },
      {
        id: 3,
        date: "2023-04-05T11:45:00",
        user: "Admin User",
        changes: [
          { field: "Phone", oldValue: "+62 878-9999-8888", newValue: "+62 878-8765-4321" },
          { field: "Address", oldValue: "Jl. Sudirman No. 45, Jakarta", newValue: "Jl. Kuningan No. 28, Jakarta" },
        ],
      },
    ],
  }
}

export default function TeacherDetailPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const teacherId = params.id
  const [teacher, setTeacher] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editedTeacher, setEditedTeacher] = useState(null)
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false)
  const [isResetAccountDialogOpen, setIsResetAccountDialogOpen] = useState(false)
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [accountStatus, setAccountStatus] = useState(false)
  const { toast } = useToast()

  // Get the active tab from URL or default to "overview"
  const activeTab = searchParams.get("tab") || "overview"

  useEffect(() => {
    // In a real app, this would fetch the teacher data from an API
    const fetchedTeacher = getTeacherById(teacherId)
    setTeacher(fetchedTeacher)
    setEditedTeacher(fetchedTeacher)
    setNewEmail(fetchedTeacher.email)
    setAccountStatus(fetchedTeacher.status === "Active")
  }, [teacherId])

  if (!teacher) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  const handleEmailChange = () => {
    // In a real app, this would call an API to update the email
    toast({
      title: "Email Updated",
      description: `Email address changed to ${newEmail}`,
    })

    // Update the teacher object with the new email
    const updatedTeacher = { ...teacher, email: newEmail }
    setTeacher(updatedTeacher)
    setEditedTeacher(updatedTeacher)

    // Add to change history
    const newChange = {
      id: teacher.changeHistory.length + 1,
      date: new Date().toISOString(),
      user: "Operator",
      changes: [{ field: "Email", oldValue: teacher.email, newValue: newEmail }],
    }

    updatedTeacher.changeHistory = [newChange, ...teacher.changeHistory]

    setIsEmailDialogOpen(false)
  }

  const handlePasswordReset = () => {
    // In a real app, this would call an API to trigger password reset
    toast({
      title: "Password Reset Link Sent",
      description: `A password reset link has been sent to ${teacher.email}`,
    })
    setIsResetPasswordDialogOpen(false)
  }

  const handleAccountReset = () => {
    // In a real app, this would call an API to reset the account
    toast({
      title: "Account Reset",
      description: `${teacher.name}'s account has been reset successfully`,
    })
    setIsResetAccountDialogOpen(false)
  }

  const handleStatusChange = (checked) => {
    setAccountStatus(checked)

    // In a real app, this would call an API to update the status
    const newStatus = checked ? "Active" : "Inactive"

    toast({
      title: "Account Status Updated",
      description: `${teacher.name}'s account is now ${newStatus}`,
    })

    // Update the teacher object with the new status
    const updatedTeacher = { ...teacher, status: newStatus }
    setTeacher(updatedTeacher)
    setEditedTeacher(updatedTeacher)

    // Add to change history
    const newChange = {
      id: teacher.changeHistory.length + 1,
      date: new Date().toISOString(),
      user: "Operator",
      changes: [{ field: "Status", oldValue: teacher.status, newValue: newStatus }],
    }

    updatedTeacher.changeHistory = [newChange, ...teacher.changeHistory]
  }

  const handleEditToggle = () => {
    if (isEditMode) {
      // If we're exiting edit mode without saving, reset to original data
      setEditedTeacher(teacher)
    }
    setIsEditMode(!isEditMode)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedTeacher((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveChanges = () => {
    // Collect the changes made
    const changes = []

    // Compare each field to find what changed
    Object.keys(editedTeacher).forEach((key) => {
      // Skip complex objects and arrays that need special handling
      if (typeof editedTeacher[key] !== "object" && teacher[key] !== editedTeacher[key]) {
        changes.push({
          field: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize field name
          oldValue: teacher[key],
          newValue: editedTeacher[key],
        })
      }
    })

    // Only proceed if there are actual changes
    if (changes.length > 0) {
      // In a real app, this would call an API to update the teacher profile

      // Add to change history
      const newChange = {
        id: teacher.changeHistory.length + 1,
        date: new Date().toISOString(),
        user: "Operator",
        changes: changes,
      }

      const updatedTeacher = {
        ...editedTeacher,
        changeHistory: [newChange, ...teacher.changeHistory],
      }

      setTeacher(updatedTeacher)

      toast({
        title: "Profile Updated",
        description: `${teacher.name}'s profile has been updated successfully`,
      })
    } else {
      toast({
        title: "No Changes Made",
        description: "No changes were detected in the profile",
      })
    }

    setIsEditMode(false)
  }

  const handleCancelEdit = () => {
    setEditedTeacher(teacher)
    setIsEditMode(false)
  }

  const handleTabChange = (value) => {
    // Update the URL with the new tab value
    router.push(`/dashboard/operator/teachers/${teacherId}?tab=${value}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.push("/dashboard/operator/teachers")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Teachers
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={teacher.profileImage} alt={teacher.name} />
            <AvatarFallback>
              {teacher.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{teacher.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{teacher.email}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>{teacher.status}</Badge>
          <Badge variant="outline">{teacher.accountType}</Badge>
          <Button variant="outline" size="sm" onClick={() => setIsHistoryDialogOpen(true)}>
            <History className="h-4 w-4 mr-1" />
            History
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid grid-cols-5 max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Teacher Information</CardTitle>
                  {isEditMode && <CardDescription>Edit mode active</CardDescription>}
                </div>
                <div>
                  {isEditMode ? (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                      <Button variant="default" size="sm" onClick={handleSaveChanges}>
                        <Save className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" onClick={handleEditToggle}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isEditMode ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={editedTeacher.name} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" name="subject" value={editedTeacher.subject} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" value={editedTeacher.phone} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="joinDate">Join Date</Label>
                        <Input
                          id="joinDate"
                          name="joinDate"
                          type="date"
                          value={editedTeacher.joinDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={editedTeacher.dateOfBirth}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="education">Education</Label>
                        <Input
                          id="education"
                          name="education"
                          value={editedTeacher.education}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={editedTeacher.address}
                        onChange={handleInputChange}
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biography</Label>
                      <Textarea id="bio" name="bio" value={editedTeacher.bio} onChange={handleInputChange} rows={3} />
                    </div>

                    <div>
                      <Label className="block mb-2">Qualifications</Label>
                      {editedTeacher.qualifications.map((qualification, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <Input
                            value={qualification}
                            onChange={(e) => {
                              const newQualifications = [...editedTeacher.qualifications]
                              newQualifications[index] = e.target.value
                              setEditedTeacher({
                                ...editedTeacher,
                                qualifications: newQualifications,
                              })
                            }}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const newQualifications = editedTeacher.qualifications.filter((_, i) => i !== index)
                              setEditedTeacher({
                                ...editedTeacher,
                                qualifications: newQualifications,
                              })
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditedTeacher({
                            ...editedTeacher,
                            qualifications: [...editedTeacher.qualifications, ""],
                          })
                        }}
                      >
                        Add Qualification
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Emergency Contact</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyName">Name</Label>
                          <Input
                            id="emergencyName"
                            value={editedTeacher.emergencyContact?.name || ""}
                            onChange={(e) => {
                              setEditedTeacher({
                                ...editedTeacher,
                                emergencyContact: {
                                  ...editedTeacher.emergencyContact,
                                  name: e.target.value,
                                },
                              })
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyRelationship">Relationship</Label>
                          <Input
                            id="emergencyRelationship"
                            value={editedTeacher.emergencyContact?.relationship || ""}
                            onChange={(e) => {
                              setEditedTeacher({
                                ...editedTeacher,
                                emergencyContact: {
                                  ...editedTeacher.emergencyContact,
                                  relationship: e.target.value,
                                },
                              })
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyPhone">Phone</Label>
                          <Input
                            id="emergencyPhone"
                            value={editedTeacher.emergencyContact?.phone || ""}
                            onChange={(e) => {
                              setEditedTeacher({
                                ...editedTeacher,
                                emergencyContact: {
                                  ...editedTeacher.emergencyContact,
                                  phone: e.target.value,
                                },
                              })
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                        <p>{teacher.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                        <p>{teacher.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                        <p>{teacher.phone}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Subject</h3>
                        <p>{teacher.subject}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Join Date</h3>
                        <p>{new Date(teacher.joinDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Last Login</h3>
                        <p>{new Date(teacher.lastLogin).toLocaleString()}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Date of Birth</h3>
                        <p>{new Date(teacher.dateOfBirth).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Education</h3>
                        <p>{teacher.education}</p>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Address</h3>
                      <p>{teacher.address}</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Biography</h3>
                      <p>{teacher.bio}</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Qualifications</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {teacher.qualifications.map((qualification, index) => (
                          <li key={index}>{qualification}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Emergency Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Name</p>
                          <p>{teacher.emergencyContact?.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Relationship</p>
                          <p>{teacher.emergencyContact?.relationship}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Phone</p>
                          <p>{teacher.emergencyContact?.phone}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Quota</CardTitle>
                <CardDescription>RPP and syllabus generation quota</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Used: {teacher.documentQuota.used}</span>
                      <span className="text-sm text-muted-foreground">
                        {teacher.documentQuota.used}/{teacher.documentQuota.total}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(teacher.documentQuota.used / teacher.documentQuota.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <Button className="w-full">Increase Quota</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Document Generation</CardTitle>
              <CardDescription>Generate RPP and syllabus documents for {teacher.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="generate" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="generate">Generate New</TabsTrigger>
                  <TabsTrigger value="history">Document History</TabsTrigger>
                </TabsList>

                <TabsContent value="generate">
                  <TeacherRPPGenerator teacherId={teacher.id} teacherName={teacher.name} />
                </TabsContent>

                <TabsContent value="history">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Recent Documents</h3>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Documents</SelectItem>
                          <SelectItem value="rpp">Lesson Plans (RPP)</SelectItem>
                          <SelectItem value="syllabus">Syllabi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Document Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Mathematics RPP - Grade 10</TableCell>
                            <TableCell>
                              <Badge variant="outline">RPP</Badge>
                            </TableCell>
                            <TableCell>July 3, 2023</TableCell>
                            <TableCell>
                              <Badge>Approved</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                                <Button variant="outline" size="sm">
                                  Download
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>History Syllabus - Semester 1</TableCell>
                            <TableCell>
                              <Badge variant="outline">Syllabus</Badge>
                            </TableCell>
                            <TableCell>June 28, 2023</TableCell>
                            <TableCell>
                              <Badge variant="secondary">Draft</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm">
                                  Download
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>World History RPP - Grade 11</TableCell>
                            <TableCell>
                              <Badge variant="outline">RPP</Badge>
                            </TableCell>
                            <TableCell>June 15, 2023</TableCell>
                            <TableCell>
                              <Badge>Approved</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                                <Button variant="outline" size="sm">
                                  Download
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Classes Tab */}
        <TabsContent value="classes">
          <Card>
            <CardHeader>
              <CardTitle>Classes</CardTitle>
              <CardDescription>Classes taught by {teacher.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teacher.classes.map((cls) => (
                  <Card key={cls.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{cls.name}</CardTitle>
                      <CardDescription>{cls.subject}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        <span className="font-medium">{cls.students}</span> students
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        View Class
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="syllabus">
          <Card>
            <CardHeader>
              <CardTitle>Syllabus Generation</CardTitle>
              <CardDescription>Create and manage syllabi for {teacher.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <TeacherSyllabusGenerator teacherId={teacher.id} teacherName={teacher.name} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Account Management</CardTitle>
                <CardDescription>Manage account settings for {teacher.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Account Status</h3>
                    <p className="text-sm text-muted-foreground">Enable or disable this teacher account</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={accountStatus} onCheckedChange={handleStatusChange} id="account-status" />
                    <Label htmlFor="account-status" className="text-sm">
                      {accountStatus ? "Active" : "Inactive"}
                    </Label>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Address</h3>
                    <p className="text-sm text-muted-foreground">{teacher.email}</p>
                  </div>
                  <Button variant="outline" onClick={() => setIsEmailDialogOpen(true)}>
                    Change Email
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Password</h3>
                    <p className="text-sm text-muted-foreground">Send a password reset link to this teacher</p>
                  </div>
                  <Button variant="outline" onClick={() => setIsResetPasswordDialogOpen(true)}>
                    Reset Password
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Account Security</h3>
                    <p className="text-sm text-muted-foreground">View login history and security settings</p>
                  </div>
                  <Button variant="outline" asChild>
                    <a href={`/dashboard/operator/teachers/${teacher.id}/security`}>Security Settings</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>These actions cannot be undone</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Reset Account</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Reset all account data including documents and settings
                  </p>
                  <Button variant="destructive" className="w-full" onClick={() => setIsResetAccountDialogOpen(true)}>
                    Reset Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Change Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Email Address</DialogTitle>
            <DialogDescription>Update the email address for {teacher.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-email">Current Email</Label>
              <Input id="current-email" value={teacher.email} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-email">New Email</Label>
              <Input
                id="new-email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email address"
              />
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Changing the email address will require the teacher to verify the new email before they can log in
                again.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEmailChange}>Update Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>Send a password reset link to {teacher.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email Address</Label>
              <Input id="reset-email" value={teacher.email} disabled />
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                This will send a password reset link to the teacher's email address. The current password will continue
                to work until they reset it.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetPasswordDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePasswordReset}>Send Reset Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Account Dialog */}
      <Dialog open={isResetAccountDialogOpen} onOpenChange={setIsResetAccountDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Reset Account</DialogTitle>
            <DialogDescription>This action cannot be undone</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Resetting this account will delete all documents, settings, and personal data. The teacher will need to
                set up their account again.
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Label htmlFor="confirm-reset">Type "RESET" to confirm</Label>
              <Input id="confirm-reset" placeholder="RESET" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetAccountDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleAccountReset}>
              Reset Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Change History</DialogTitle>
            <DialogDescription>View all changes made to {teacher.name}'s profile</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <TeacherChangeHistory history={teacher.changeHistory} />
          </div>
          <DialogFooter>
            <Button onClick={() => setIsHistoryDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

