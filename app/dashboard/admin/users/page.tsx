"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Search, UserPlus, Filter, Download, MoreHorizontal, Mail, Trash2, Edit, Shield, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMediaQuery } from "@/hooks/use-mobile"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Enhanced mock data with more details
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Operator",
    status: "Active",
    lastActive: "Today at 2:34 PM",
    avatar: "/placeholder.svg",
    phone: "+62 812-3456-7890",
    joinDate: "Jan 15, 2023",
    school: "SMA Negeri 1 Jakarta",
    permissions: ["View Reports", "Edit Teachers", "Manage Classes"],
    bio: "Experienced school operator with 5 years of administrative experience.",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Teacher",
    status: "Active",
    lastActive: "Yesterday at 10:15 AM",
    avatar: "/placeholder.svg",
    phone: "+62 813-9876-5432",
    joinDate: "Mar 22, 2023",
    school: "SMA Negeri 1 Jakarta",
    permissions: ["Create Lessons", "View Students"],
    bio: "Mathematics teacher specializing in algebra and calculus.",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Operator",
    status: "Inactive",
    lastActive: "3 days ago",
    avatar: "/placeholder.svg",
    phone: "+62 857-1234-5678",
    joinDate: "Feb 10, 2023",
    school: "SMA Negeri 2 Surabaya",
    permissions: ["View Reports", "Edit Teachers"],
    bio: "School administrator handling daily operations and teacher coordination.",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "Just now",
    avatar: "/placeholder.svg",
    phone: "+62 821-8765-4321",
    joinDate: "Dec 5, 2022",
    school: "System Admin",
    permissions: ["Full Access", "System Configuration", "User Management"],
    bio: "System administrator responsible for platform maintenance and user support.",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Teacher",
    status: "Pending",
    lastActive: "1 week ago",
    avatar: "/placeholder.svg",
    phone: "+62 878-9876-5432",
    joinDate: "Apr 18, 2023",
    school: "SMA Negeri 2 Surabaya",
    permissions: ["Create Lessons", "View Students"],
    bio: "Science teacher with expertise in biology and environmental science.",
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Apply filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return <Shield className="h-4 w-4 text-primary" />
      case "operator":
        return <User className="h-4 w-4 text-secondary" />
      default:
        return <User className="h-4 w-4 text-accent" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-500">
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="secondary" className="bg-gray-400">
            Inactive
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Add this function to determine whether to use a dialog or drawer based on screen size
  function UserDetailsDialog({ user, children }: { user: any; children: React.ReactNode }) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
      return (
        <Dialog>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <UserDetailsContent user={user} />
          </DialogContent>
        </Dialog>
      )
    }

    return (
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <UserDetailsContent user={user} isDrawer />
        </DrawerContent>
      </Drawer>
    )
  }

  function UserDetailsContent({ user, isDrawer = false }: { user: any; isDrawer?: boolean }) {
    return (
      <>
        {isDrawer ? (
          <DrawerHeader>
            <DrawerTitle>User Details</DrawerTitle>
            <DrawerDescription>View and manage user information</DrawerDescription>
          </DrawerHeader>
        ) : (
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>View and manage user information</DialogDescription>
          </DialogHeader>
        )}

        <Tabs defaultValue="details" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>

          <ScrollArea className={isDrawer ? "h-[50vh]" : ""}>
            <TabsContent value="details" className="space-y-4 mt-4 p-1">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Avatar className="h-20 w-20 border border-border">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <div className="flex items-center gap-2">
                    {getRoleIcon(user.role)}
                    <span className="text-sm text-muted-foreground">{user.role}</span>
                  </div>
                  <div className="mt-1">{getStatusBadge(user.status)}</div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{user.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p>{user.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">School</p>
                  <p>{user.school}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Join Date</p>
                  <p>{user.joinDate}</p>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Bio</p>
                  <p className="text-sm">{user.bio}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Permissions</p>
                <div className="flex flex-wrap gap-2">
                  {user.permissions.map((permission: string) => (
                    <Badge key={permission} variant="outline" className="bg-primary/5">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Activity</p>
                <p className="text-sm">Last active: {user.lastActive}</p>
              </div>
            </TabsContent>

            <TabsContent value="edit" className="space-y-4 mt-4 p-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input id="edit-name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" defaultValue={user.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input id="edit-phone" defaultValue={user.phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select defaultValue={user.role.toLowerCase()}>
                    <SelectTrigger id="edit-role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="operator">Operator</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="edit-bio">Bio</Label>
                  <Textarea id="edit-bio" defaultValue={user.bio} rows={4} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select defaultValue={user.status.toLowerCase()}>
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </TabsContent>

            <TabsContent value="email" className="space-y-4 mt-4 p-1">
              <div className="space-y-2">
                <Label htmlFor="email-to">To</Label>
                <Input id="email-to" defaultValue={user.email} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-subject">Subject</Label>
                <Input id="email-subject" placeholder="Enter email subject" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-message">Message</Label>
                <Textarea
                  id="email-message"
                  placeholder="Write your message here..."
                  rows={8}
                  className="resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Send Email</Button>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        {isDrawer && (
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </>
    )
  }

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts, permissions, and access.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Add User</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full sm:w-[250px] rounded-lg"
              />
            </div>

            <div className="flex gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="operator">Operator</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" className="rounded-lg">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          <Card className="border-none shadow-sm">
            <CardContent className="p-0">
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableHead className="w-[250px]">User</TableHead>
                      <TableHead className="hidden md:table-cell">Role</TableHead>
                      <TableHead className="hidden md:table-cell">Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No users found matching your filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id} className="group">
                          <TableCell>
                            <UserDetailsDialog user={user}>
                              <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                                <Avatar className="h-9 w-9 border border-border">
                                  <AvatarImage src={user.avatar} alt={user.name} />
                                  <AvatarFallback className="bg-primary/10 text-primary">
                                    {user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                              </div>
                            </UserDetailsDialog>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              {getRoleIcon(user.role)}
                              <span>{user.role}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{getStatusBadge(user.status)}</TableCell>
                          <TableCell className="hidden lg:table-cell text-muted-foreground">
                            {user.lastActive}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end">
                              <UserDetailsDialog user={user}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                  <span className="hidden sm:inline">Details</span>
                                </Button>
                              </UserDetailsDialog>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[180px]">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <UserDetailsDialog user={user}>
                                    <DropdownMenuItem>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit User
                                    </DropdownMenuItem>
                                  </UserDetailsDialog>
                                  <UserDetailsDialog user={user}>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                      <Mail className="mr-2 h-4 w-4" />
                                      Send Email
                                    </DropdownMenuItem>
                                  </UserDetailsDialog>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="m-0">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 text-center">
              <p>Active users content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="m-0">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 text-center">
              <p>Inactive users content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="m-0">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 text-center">
              <p>Pending users content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

