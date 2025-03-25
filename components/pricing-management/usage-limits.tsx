"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define types
interface UsageLimit {
  id: string
  name: string
  description: string
  category: string
  basicLimit: string
  professionalLimit: string
  enterpriseLimit: string
  unit: string
}

export function UsageLimits() {
  // Sample initial data
  const [usageLimits, setUsageLimits] = useState<UsageLimit[]>([
    {
      id: "1",
      name: "Students",
      description: "Maximum number of student profiles",
      category: "Users",
      basicLimit: "100",
      professionalLimit: "500",
      enterpriseLimit: "Unlimited",
      unit: "students",
    },
    {
      id: "2",
      name: "Storage",
      description: "Storage space for documents and media",
      category: "Resources",
      basicLimit: "5",
      professionalLimit: "20",
      enterpriseLimit: "100",
      unit: "GB",
    },
    {
      id: "3",
      name: "API Calls",
      description: "Number of API calls per day",
      category: "API",
      basicLimit: "1,000",
      professionalLimit: "10,000",
      enterpriseLimit: "100,000",
      unit: "calls/day",
    },
    {
      id: "4",
      name: "Reports",
      description: "Number of custom reports",
      category: "Reporting",
      basicLimit: "5",
      professionalLimit: "20",
      enterpriseLimit: "Unlimited",
      unit: "reports",
    },
    {
      id: "5",
      name: "Admin Users",
      description: "Number of admin user accounts",
      category: "Users",
      basicLimit: "2",
      professionalLimit: "5",
      enterpriseLimit: "20",
      unit: "users",
    },
  ])

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentLimit, setCurrentLimit] = useState<UsageLimit | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("all")

  // Function to add a new usage limit
  const handleAddLimit = () => {
    const newLimit: UsageLimit = {
      id: Date.now().toString(),
      name: "",
      description: "",
      category: "Users",
      basicLimit: "",
      professionalLimit: "",
      enterpriseLimit: "",
      unit: "",
    }

    setCurrentLimit(newLimit)
    setIsEditDialogOpen(true)
  }

  // Function to edit a usage limit
  const handleEditLimit = (limit: UsageLimit) => {
    setCurrentLimit({ ...limit })
    setIsEditDialogOpen(true)
  }

  // Function to delete a usage limit
  const handleDeleteLimit = (limitId: string) => {
    setUsageLimits(usageLimits.filter((limit) => limit.id !== limitId))
  }

  // Function to save usage limit changes
  const handleSaveLimit = () => {
    if (!currentLimit || !currentLimit.name.trim()) return

    const limitExists = usageLimits.some((limit) => limit.id === currentLimit.id)

    if (limitExists) {
      setUsageLimits(usageLimits.map((limit) => (limit.id === currentLimit.id ? currentLimit : limit)))
    } else {
      setUsageLimits([...usageLimits, currentLimit])
    }

    setIsEditDialogOpen(false)
    setCurrentLimit(null)
  }

  // Get unique categories for filtering
  const categories = ["all", ...new Set(usageLimits.map((limit) => limit.category))]

  // Filter limits by category
  const filteredLimits =
    filterCategory === "all" ? usageLimits : usageLimits.filter((limit) => limit.category === filterCategory)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Usage Limits</h2>
        <Button onClick={handleAddLimit}>
          <Plus className="mr-2 h-4 w-4" /> Add Limit
        </Button>
      </div>

      <div className="mb-6">
        <Label htmlFor="filter-category" className="mr-2">
          Filter by Category:
        </Label>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger id="filter-category" className="w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usage Limits by Plan</CardTitle>
          <CardDescription>Define resource limits for each pricing tier</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resource</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Basic</TableHead>
                <TableHead>Professional</TableHead>
                <TableHead>Enterprise</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLimits.map((limit) => (
                <TableRow key={limit.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="font-medium">{limit.name}</div>
                        <div className="text-sm text-muted-foreground">{limit.description}</div>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Unit: {limit.unit}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{limit.category}</Badge>
                  </TableCell>
                  <TableCell>{limit.basicLimit}</TableCell>
                  <TableCell>{limit.professionalLimit}</TableCell>
                  <TableCell>{limit.enterpriseLimit}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditLimit(limit)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteLimit(limit.id)}>
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredLimits.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No usage limits found. {filterCategory !== "all" && "Try changing the filter or "}
                    <Button variant="link" className="p-0 h-auto" onClick={handleAddLimit}>
                      add a new limit
                    </Button>
                    .
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Usage Limit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentLimit?.name ? "Edit Usage Limit" : "Add Usage Limit"}</DialogTitle>
            <DialogDescription>Define resource limits for each pricing tier.</DialogDescription>
          </DialogHeader>

          {currentLimit && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="limit-name">Resource Name</Label>
                <Input
                  id="limit-name"
                  value={currentLimit.name}
                  onChange={(e) => setCurrentLimit({ ...currentLimit, name: e.target.value })}
                  placeholder="e.g., Storage Space"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="limit-description">Description</Label>
                <Input
                  id="limit-description"
                  value={currentLimit.description}
                  onChange={(e) => setCurrentLimit({ ...currentLimit, description: e.target.value })}
                  placeholder="Brief description of this resource"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="limit-category">Category</Label>
                  <Select
                    value={currentLimit.category}
                    onValueChange={(value) => setCurrentLimit({ ...currentLimit, category: value })}
                  >
                    <SelectTrigger id="limit-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Users">Users</SelectItem>
                      <SelectItem value="Resources">Resources</SelectItem>
                      <SelectItem value="API">API</SelectItem>
                      <SelectItem value="Reporting">Reporting</SelectItem>
                      <SelectItem value="Storage">Storage</SelectItem>
                      <SelectItem value="Features">Features</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="limit-unit">Unit</Label>
                  <Input
                    id="limit-unit"
                    value={currentLimit.unit}
                    onChange={(e) => setCurrentLimit({ ...currentLimit, unit: e.target.value })}
                    placeholder="e.g., GB, users, etc."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="basic-limit">Basic Plan Limit</Label>
                <Input
                  id="basic-limit"
                  value={currentLimit.basicLimit}
                  onChange={(e) => setCurrentLimit({ ...currentLimit, basicLimit: e.target.value })}
                  placeholder="e.g., 5, 100, Unlimited"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="professional-limit">Professional Plan Limit</Label>
                <Input
                  id="professional-limit"
                  value={currentLimit.professionalLimit}
                  onChange={(e) => setCurrentLimit({ ...currentLimit, professionalLimit: e.target.value })}
                  placeholder="e.g., 20, 500, Unlimited"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="enterprise-limit">Enterprise Plan Limit</Label>
                <Input
                  id="enterprise-limit"
                  value={currentLimit.enterpriseLimit}
                  onChange={(e) => setCurrentLimit({ ...currentLimit, enterpriseLimit: e.target.value })}
                  placeholder="e.g., 100, 1000, Unlimited"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveLimit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

