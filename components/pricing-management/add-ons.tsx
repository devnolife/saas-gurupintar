"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Plus, Edit, Copy, Trash, Check } from "lucide-react"

// Define types
interface Feature {
  id: string
  name: string
  included: boolean
}

interface SchoolLevel {
  id: string
  name: string
  compatible: boolean
}

interface AddOn {
  id: string
  name: string
  description: string
  price: number
  features: Feature[]
  schoolLevels: SchoolLevel[]
}

export function AddOns() {
  // Sample initial data
  const [addOns, setAddOns] = useState<AddOn[]>([
    {
      id: "1",
      name: "Advanced Reporting",
      description: "Get detailed insights with advanced reporting tools",
      price: 49,
      features: [
        { id: "f1", name: "Custom report builder", included: true },
        { id: "f2", name: "Data export options", included: true },
        { id: "f3", name: "Scheduled reports", included: true },
      ],
      schoolLevels: [
        { id: "sl1", name: "Elementary", compatible: true },
        { id: "sl2", name: "Middle School", compatible: true },
        { id: "sl3", name: "High School", compatible: true },
        { id: "sl4", name: "College", compatible: false },
      ],
    },
    {
      id: "2",
      name: "Parent Portal",
      description: "Enhance parent engagement with a dedicated portal",
      price: 39,
      features: [
        { id: "f1", name: "Real-time updates", included: true },
        { id: "f2", name: "Direct messaging", included: true },
        { id: "f3", name: "Event calendar", included: true },
      ],
      schoolLevels: [
        { id: "sl1", name: "Elementary", compatible: true },
        { id: "sl2", name: "Middle School", compatible: true },
        { id: "sl3", name: "High School", compatible: true },
        { id: "sl4", name: "College", compatible: true },
      ],
    },
  ])

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentAddOn, setCurrentAddOn] = useState<AddOn | null>(null)
  const [isAddFeatureDialogOpen, setIsAddFeatureDialogOpen] = useState(false)
  const [newFeature, setNewFeature] = useState("")

  // Function to add a new add-on
  const handleAddAddOn = () => {
    const newAddOn: AddOn = {
      id: Date.now().toString(),
      name: "New Add-on",
      description: "Description for the new add-on",
      price: 0,
      features: [],
      schoolLevels: [
        { id: "sl1", name: "Elementary", compatible: true },
        { id: "sl2", name: "Middle School", compatible: true },
        { id: "sl3", name: "High School", compatible: true },
        { id: "sl4", name: "College", compatible: true },
      ],
    }

    setCurrentAddOn(newAddOn)
    setIsEditDialogOpen(true)
  }

  // Function to edit an add-on
  const handleEditAddOn = (addOn: AddOn) => {
    setCurrentAddOn({ ...addOn })
    setIsEditDialogOpen(true)
  }

  // Function to duplicate an add-on
  const handleDuplicateAddOn = (addOn: AddOn) => {
    const duplicatedAddOn: AddOn = {
      ...addOn,
      id: Date.now().toString(),
      name: `${addOn.name} (Copy)`,
    }

    setAddOns([...addOns, duplicatedAddOn])
  }

  // Function to delete an add-on
  const handleDeleteAddOn = (addOnId: string) => {
    setAddOns(addOns.filter((addOn) => addOn.id !== addOnId))
  }

  // Function to save add-on changes
  const handleSaveAddOn = () => {
    if (!currentAddOn) return

    const addOnExists = addOns.some((addOn) => addOn.id === currentAddOn.id)

    if (addOnExists) {
      setAddOns(addOns.map((addOn) => (addOn.id === currentAddOn.id ? currentAddOn : addOn)))
    } else {
      setAddOns([...addOns, currentAddOn])
    }

    setIsEditDialogOpen(false)
    setCurrentAddOn(null)
  }

  // Function to add a new feature to an add-on
  const handleAddFeature = () => {
    if (!currentAddOn || !newFeature.trim()) return

    const newFeatureObj: Feature = {
      id: Date.now().toString(),
      name: newFeature,
      included: true,
    }

    setCurrentAddOn({
      ...currentAddOn,
      features: [...currentAddOn.features, newFeatureObj],
    })

    setNewFeature("")
    setIsAddFeatureDialogOpen(false)
  }

  // Function to remove a feature
  const handleRemoveFeature = (featureId: string) => {
    if (!currentAddOn) return

    setCurrentAddOn({
      ...currentAddOn,
      features: currentAddOn.features.filter((feature) => feature.id !== featureId),
    })
  }

  // Function to toggle school level compatibility
  const handleToggleSchoolLevel = (levelId: string) => {
    if (!currentAddOn) return

    setCurrentAddOn({
      ...currentAddOn,
      schoolLevels: currentAddOn.schoolLevels.map((level) =>
        level.id === levelId ? { ...level, compatible: !level.compatible } : level,
      ),
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Add-on Modules</h2>
        <Button onClick={handleAddAddOn}>
          <Plus className="mr-2 h-4 w-4" /> Add Module
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addOns.map((addOn) => (
          <Card key={addOn.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{addOn.name}</CardTitle>
                  <CardDescription>{addOn.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditAddOn(addOn)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicateAddOn(addOn)}>
                      <Copy className="mr-2 h-4 w-4" /> Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteAddOn(addOn.id)} className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">
                ${addOn.price}
                <span className="text-sm font-normal">/month</span>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Features:</h4>
                <ul className="space-y-1">
                  {addOn.features.map((feature) => (
                    <li key={feature.id} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      {feature.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Compatible with:</h4>
                <div className="flex flex-wrap gap-2">
                  {addOn.schoolLevels
                    .filter((level) => level.compatible)
                    .map((level) => (
                      <span key={level.id} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {level.name}
                      </span>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Add-on Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{currentAddOn?.id ? "Edit Add-on Module" : "Add Add-on Module"}</DialogTitle>
            <DialogDescription>Make changes to the add-on module details below.</DialogDescription>
          </DialogHeader>

          {currentAddOn && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={currentAddOn.name}
                    onChange={(e) => setCurrentAddOn({ ...currentAddOn, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($/month)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={currentAddOn.price}
                    onChange={(e) => setCurrentAddOn({ ...currentAddOn, price: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={currentAddOn.description}
                  onChange={(e) => setCurrentAddOn({ ...currentAddOn, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Features</Label>
                  <Button variant="outline" size="sm" onClick={() => setIsAddFeatureDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Add Feature
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentAddOn.features.map((feature) => (
                      <TableRow key={feature.id}>
                        <TableCell>{feature.name}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveFeature(feature.id)}>
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {currentAddOn.features.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center text-muted-foreground">
                          No features added yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-2">
                <Label>School Level Compatibility</Label>
                <div className="space-y-2">
                  {currentAddOn.schoolLevels.map((level) => (
                    <div key={level.id} className="flex items-center space-x-2">
                      <Switch
                        id={`level-${level.id}`}
                        checked={level.compatible}
                        onCheckedChange={() => handleToggleSchoolLevel(level.id)}
                      />
                      <Label htmlFor={`level-${level.id}`}>{level.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAddOn}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Feature Dialog */}
      <Dialog open={isAddFeatureDialogOpen} onOpenChange={setIsAddFeatureDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Feature</DialogTitle>
            <DialogDescription>Add a new feature to this add-on module.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="feature-name">Feature Name</Label>
              <Input
                id="feature-name"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="e.g., Advanced Analytics"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddFeatureDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddFeature}>Add Feature</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

