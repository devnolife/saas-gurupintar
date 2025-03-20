"use client"

import { useState } from "react"
import { Search, Plus, MoreHorizontal, CheckCircle2, XCircle, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OperatorForm } from "@/components/operators/OperatorForm"
import { OperatorStats } from "@/components/operators/OperatorStats"

// Mock data for operators
const operators = [
  {
    id: "op-001",
    name: "Alex Johnson",
    email: "alex.j@gurupintar.com",
    role: "Senior Operator",
    status: "active",
    schools: 12,
    joinDate: "2022-05-15",
    lastActive: "2023-03-10T09:43:12",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "op-002",
    name: "Sam Rivera",
    email: "sam.r@gurupintar.com",
    role: "Junior Operator",
    status: "active",
    schools: 5,
    joinDate: "2022-08-22",
    lastActive: "2023-03-09T14:22:01",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "op-003",
    name: "Taylor Kim",
    email: "taylor.k@gurupintar.com",
    role: "Senior Operator",
    status: "inactive",
    schools: 8,
    joinDate: "2021-11-03",
    lastActive: "2023-02-15T11:05:45",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "op-004",
    name: "Jordan Patel",
    email: "jordan.p@gurupintar.com",
    role: "Junior Operator",
    status: "active",
    schools: 3,
    joinDate: "2023-01-10",
    lastActive: "2023-03-10T08:17:33",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "op-005",
    name: "Casey Wong",
    email: "casey.w@gurupintar.com",
    role: "Senior Operator",
    status: "active",
    schools: 15,
    joinDate: "2021-06-18",
    lastActive: "2023-03-09T16:50:22",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function OperatorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedOperator, setSelectedOperator] = useState(null)
  const [isAddOperatorOpen, setIsAddOperatorOpen] = useState(false)

  // Filter operators based on search term and filters
  const filteredOperators = operators.filter((operator) => {
    const matchesSearch =
      operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || operator.status === statusFilter

    const matchesRole = roleFilter === "all" || operator.role.toLowerCase().includes(roleFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesRole
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Operators
          </h1>
          <p className="text-muted-foreground mt-1">Manage operator accounts and permissions</p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Dialog open={isAddOperatorOpen} onOpenChange={setIsAddOperatorOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                <span>Add Operator</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Operator</DialogTitle>
                <DialogDescription>Create a new operator account with specific permissions.</DialogDescription>
              </DialogHeader>
              <OperatorForm onSubmit={() => setIsAddOperatorOpen(false)} />
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list" className="gap-2">
            <span>Operator List</span>
          </TabsTrigger>
          <TabsTrigger value="stats" className="gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Performance Stats</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search operators..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                      <SelectItem value="junior">Junior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Role</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Schools</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Last Active</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredOperators.map((operator) => (
                        <motion.tr
                          key={operator.id}
                          className="bg-white hover:bg-muted/30 transition-colors"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8 border">
                                <AvatarImage src={operator.avatar} alt={operator.name} />
                                <AvatarFallback>{operator.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{operator.name}</div>
                                <div className="text-sm text-muted-foreground">{operator.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium">{operator.role}</div>
                            <div className="text-xs text-muted-foreground">Since {formatDate(operator.joinDate)}</div>
                          </td>
                          <td className="px-4 py-3">
                            {operator.status === "active" ? (
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
                              >
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Active
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50"
                              >
                                <XCircle className="mr-1 h-3 w-3" />
                                Inactive
                              </Badge>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium">{operator.schools}</div>
                            <div className="text-xs text-muted-foreground">Assigned</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium">{formatDateTime(operator.lastActive)}</div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Dialog>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem onClick={() => setSelectedOperator(operator)}>
                                      View Details
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                              <DialogContent className="sm:max-w-[500px]">
                                {selectedOperator && (
                                  <>
                                    <DialogHeader>
                                      <DialogTitle>Operator Details</DialogTitle>
                                      <DialogDescription>Detailed information about this operator.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="flex items-center gap-4">
                                        <Avatar className="h-16 w-16 border">
                                          <AvatarImage src={selectedOperator.avatar} alt={selectedOperator.name} />
                                          <AvatarFallback>{selectedOperator.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <h3 className="text-xl font-semibold">{selectedOperator.name}</h3>
                                          <p className="text-muted-foreground">{selectedOperator.email}</p>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4 pt-4">
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground">Role</h4>
                                          <p>{selectedOperator.role}</p>
                                        </div>
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                                          <p className="capitalize">{selectedOperator.status}</p>
                                        </div>
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground">Join Date</h4>
                                          <p>{formatDate(selectedOperator.joinDate)}</p>
                                        </div>
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground">Schools</h4>
                                          <p>{selectedOperator.schools} schools</p>
                                        </div>
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button variant="outline">Edit</Button>
                                      <Button>Close</Button>
                                    </DialogFooter>
                                  </>
                                )}
                              </DialogContent>
                            </Dialog>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{filteredOperators.length}</strong> of <strong>{operators.length}</strong> operators
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <OperatorStats operators={operators} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

