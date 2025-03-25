"use client"

import { useState } from "react"
import { Edit, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for usage limits
const initialUsageLimits = {
  elementary: [
    {
      id: "elem-limit-1",
      name: "Lesson Plans",
      description: "Maximum number of lesson plans that can be generated per month",
      basic: 5,
      standard: 25,
      premium: "Unlimited",
      unit: "plans/month",
      isActive: true,
    },
    {
      id: "elem-limit-2",
      name: "Resource Downloads",
      description: "Maximum number of resources that can be downloaded per month",
      basic: 20,
      standard: 100,
      premium: 500,
      unit: "downloads/month",
      isActive: true,
    },
    {
      id: "elem-limit-3",
      name: "Storage Space",
      description: "Maximum storage space for uploaded files and resources",
      basic: 1,
      standard: 5,
      premium: 20,
      unit: "GB",
      isActive: true,
    },
    {
      id: "elem-limit-4",
      name: "Custom Templates",
      description: "Maximum number of custom templates that can be created",
      basic: 2,
      standard: 10,
      premium: 50,
      unit: "templates",
      isActive: true,
    },
    {
      id: "elem-limit-5",
      name: "API Requests",
      description: "Maximum number of API requests per day",
      basic: 100,
      standard: 1000,
      premium: 10000,
      unit: "requests/day",
      isActive: true,
    },
  ],
  middle: [
    {
      id: "mid-limit-1",
      name: "Lesson Plans",
      description: "Maximum number of lesson plans that can be generated per month",
      basic: 10,
      standard: 35,
      premium: "Unlimited",
      unit: "plans/month",
      isActive: true,
    },
    {
      id: "mid-limit-2",
      name: "Resource Downloads",
      description: "Maximum number of resources that can be downloaded per month",
      basic: 30,
      standard: 150,
      premium: 750,
      unit: "downloads/month",
      isActive: true,
    },
    {
      id: "mid-limit-3",
      name: "Storage Space",
      description: "Maximum storage space for uploaded files and resources",
      basic: 2,
      standard: 10,
      premium: 30,
      unit: "GB",
      isActive: true,
    },
    {
      id: "mid-limit-4",
      name: "Custom Templates",
      description: "Maximum number of custom templates that can be created",
      basic: 3,
      standard: 15,
      premium: 75,
      unit: "templates",
      isActive: true,
    },
    {
      id: "mid-limit-5",
      name: "API Requests",
      description: "Maximum number of API requests per day",
      basic: 200,
      standard: 2000,
      premium: 20000,
      unit: "requests/day",
      isActive: true,
    },
  ],
  high: [
    {
      id: "high-limit-1",
      name: "Lesson Plans",
      description: "Maximum number of lesson plans that can be generated per month",
      basic: 15,
      standard: 50,
      premium: "Unlimited",
      unit: "plans/month",
      isActive: true,
    },
    {
      id: "high-limit-2",
      name: "Resource Downloads",
      description: "Maximum number of resources that can be downloaded per month",
      basic: 50,
      standard: 250,
      premium: 1000,
      unit: "downloads/month",
      isActive: true,
    },
    {
      id: "high-limit-3",
      name: "Storage Space",
      description: "Maximum storage space for uploaded files and resources",
      basic: 3,
      standard: 15,
      premium: 50,
      unit: "GB",
      isActive: true,
    },
    {
      id: "high-limit-4",
      name: "Custom Templates",
      description: "Maximum number of custom templates that can be created",
      basic: 5,
      standard: 25,
      premium: 100,
      unit: "templates",
      isActive: true,
    },
    {
      id: "high-limit-5",
      name: "API Requests",
      description: "Maximum number of API requests per day",
      basic: 300,
      standard: 3000,
      premium: 30000,
      unit: "requests/day",
      isActive: true,
    },
  ],
}

export function UsageLimits() {
  const [usageLimits, setUsageLimits] = useState(initialUsageLimits)
  const [activeSchoolLevel, setActiveSchoolLevel] = useState("elementary")
  const [editingLimit, setEditingLimit] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSaveLimit = () => {
    if (editingLimit) {
      const updatedLimits = { ...usageLimits }
      const limitIndex = updatedLimits[activeSchoolLevel].findIndex((l) => l.id === editingLimit.id)

      if (limitIndex >= 0) {
        updatedLimits[activeSchoolLevel][limitIndex] = editingLimit
      } else {
        updatedLimits[activeSchoolLevel].push(editingLimit)
      }

      setUsageLimits(updatedLimits)
      setIsDialogOpen(false)
      setEditingLimit(null)
    }
  }

  const handleEditLimit = (limit) => {
    setEditingLimit({ ...limit })
    setIsDialogOpen(true)
  }

  const handleAddNewLimit = () => {
    const newId = `${activeSchoolLevel}-limit-new-${Date.now()}`
    setEditingLimit({
      id: newId,
      name: "New Usage Limit",
      description: "Description for the new usage limit",
      basic: 0,
      standard: 0,
      premium: 0,
      unit: "",
      isActive: true,
    })
    setIsDialogOpen(true)
  }

  const handleDeleteLimit = (limitId) => {
    if (confirm("Are you sure you want to delete this usage limit? This action cannot be undone.")) {
      const updatedLimits = { ...usageLimits }
      updatedLimits[activeSchoolLevel] = updatedLimits[activeSchoolLevel].filter((l) => l.id !== limitId)
      setUsageLimits(updatedLimits)
    }
  }

  const handleCopyToAllLevels = (limit) => {
    if (
      confirm(
        "Are you sure you want to copy this usage limit to all school levels? This will overwrite any existing limits with the same name.",
      )
    ) {
      const updatedLimits = { ...usageLimits }[("elementary", "middle", "high")].forEach((level) => {
        if (level !== activeSchoolLevel) {
          const existingLimitIndex = updatedLimits[level].findIndex((l) => l.name === limit.name)

          if (existingLimitIndex >= 0) {
            updatedLimits[level][existingLimitIndex] = {
              ...limit,
              id: `${level}-limit-${Date.now()}`,
            }
          } else {
            updatedLimits[level].push({
              ...limit,
              id: `${level}-limit-${Date.now()}`,
            })
          }
        }
      })

      setUsageLimits(updatedLimits)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Usage Limits</h2>
        <Button onClick={handleAddNewLimit}>
          <Plus className="mr-2 h-4 w-4" /> Add New Limit
        </Button>
      </div>

      <Tabs value={activeSchoolLevel} onValueChange={setActiveSchoolLevel}>
        <TabsList className="mb-4">
          <TabsTrigger value="elementary">Elementary School</TabsTrigger>
          <TabsTrigger value="middle">Middle School</TabsTrigger>
          <TabsTrigger value="high">High School</TabsTrigger>
        </TabsList>

        {["elementary", "middle", "high"].map((level) => (
          <TabsContent key={level} value={level}>
            <Card>
              <CardHeader>
                <CardTitle>Usage Limits</CardTitle>
                <CardDescription>
                  Configure usage limits for different pricing tiers for{" "}
                  {level.charAt(0).toUpperCase() + level.slice(1)} School
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Limit</TableHead>
                      <TableHead className="text-center">Basic</TableHead>
                      <TableHead className="text-center">Standard</TableHead>
                      <TableHead className="text-center">Premium</TableHead>
                      <TableHead className="text-center">Unit</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usageLimits[level].map((limit) => (
                      <TableRow key={limit.id}>
                        <TableCell>
                          <div className="font-medium">{limit.name}</div>
                          <div className="text-sm text-muted-foreground">{limit.description}</div>
                        </TableCell>
                        <TableCell className="text-center">{limit.basic}</TableCell>
                        <TableCell className="text-center">{limit.standard}</TableCell>
                        <TableCell className="text-center">{limit.premium}</TableCell>
                        <TableCell className="text-center">{limit.unit}</TableCell>
                        <TableCell className="text-center">
                          <Switch
                            id={`active-${limit.id}`}
                            checked={limit.isActive}
                            onCheckedChange={(checked) => {
                              const updatedLimits = { ...usageLimits }
                              const limitIndex = updatedLimits[level].findIndex((l) => l.id === limit.id)
                              updatedLimits[level][limitIndex].isActive = checked
                              setUsageLimits(updatedLimits)
                            }}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditLimit(limit)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleCopyToAllLevels(limit)}>
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteLimit(limit.id)}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingLimit?.id.includes("new") ? "Add New Usage Limit" : "Edit Usage Limit"}</DialogTitle>
            <DialogDescription>Configure the usage limit details for different pricing tiers.</DialogDescription>
          </DialogHeader>

          {editingLimit && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="limit-name">Limit Name</Label>
                <Input
                  id="limit-name"
                  value={editingLimit.name}
                  onChange={(e) => setEditingLimit({ ...editingLimit, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="limit-description">Description</Label>
                <Textarea
                  id="limit-description"
                  value={editingLimit.description}
                  onChange={(e) => setEditingLimit({ ...editingLimit, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="limit-unit">Unit</Label>
                  <Input
                    id="limit-unit"
                    value={editingLimit.unit}
                    onChange={(e) => setEditingLimit({ ...editingLimit, unit: e.target.value })}
                    placeholder="e.g., GB, requests/day, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="limit-active">Status</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="limit-active"
                      checked={editingLimit.isActive}
                      onCheckedChange={(checked) => setEditingLimit({ ...editingLimit, isActive: checked })}
                    />
                    <Label htmlFor="limit-active">Active</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Limits for Pricing Tiers</Label>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="basic-limit">Basic</Label>
                    <Input
                      id="basic-limit"
                      value={editingLimit.basic}
                      onChange={(e) => setEditingLimit({ ...editingLimit, basic: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="standard-limit">Standard</Label>
                    <Input
                      id="standard-limit"
                      value={editingLimit.standard}
                      onChange={(e) => setEditingLimit({ ...editingLimit, standard: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="premium-limit">Premium</Label>
                    <Input
                      id="premium-limit"
                      value={editingLimit.premium}
                      onChange={(e) => setEditingLimit({ ...editingLimit, premium: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveLimit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

