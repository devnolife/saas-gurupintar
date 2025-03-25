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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash, Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Define types
interface Feature {
  id: string
  name: string
  description: string
  category: string
  availableIn: {
    basic: boolean
    professional: boolean
    enterprise: boolean
  }
}

export function Features() {
  // Sample initial data
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: "1",
      name: "Student Management",
      description: "Manage student profiles, attendance, and performance",
      category: "Core",
      availableIn: {
        basic: true,
        professional: true,
        enterprise: true,
      },
    },
    {
      id: "2",
      name: "Advanced Reporting",
      description: "Generate detailed reports on student performance and school metrics",
      category: "Reporting",
      availableIn: {
        basic: false,
        professional: true,
        enterprise: true,
      },
    },
    {
      id: "3",
      name: "API Access",
      description: "Access to our API for custom integrations",
      category: "Integration",
      availableIn: {
        basic: false,
        professional: false,
        enterprise: true,
      },
    },
    {
      id: "4",
      name: "Parent Portal",
      description: "Portal for parents to view student information",
      category: "Communication",
      availableIn: {
        basic: true,
        professional: true,
        enterprise: true,
      },
    },
    {
      id: "5",
      name: "Custom Branding",
      description: "Add your school logo and customize colors",
      category: "Customization",
      availableIn: {
        basic: false,
        professional: true,
        enterprise: true,
      },
    },
  ])

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentFeature, setCurrentFeature] = useState<Feature | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("all")

  // Function to add a new feature
  const handleAddFeature = () => {
    const newFeature: Feature = {
      id: Date.now().toString(),
      name: "",
      description: "",
      category: "Core",
      availableIn: {
        basic: false,
        professional: false,
        enterprise: true,
      },
    }

    setCurrentFeature(newFeature)
    setIsEditDialogOpen(true)
  }

  // Function to edit a feature
  const handleEditFeature = (feature: Feature) => {
    setCurrentFeature({ ...feature })
    setIsEditDialogOpen(true)
  }

  // Function to delete a feature
  const handleDeleteFeature = (featureId: string) => {
    setFeatures(features.filter((feature) => feature.id !== featureId))
  }

  // Function to save feature changes
  const handleSaveFeature = () => {
    if (!currentFeature || !currentFeature.name.trim()) return

    const featureExists = features.some((feature) => feature.id === currentFeature.id)

    if (featureExists) {
      setFeatures(features.map((feature) => (feature.id === currentFeature.id ? currentFeature : feature)))
    } else {
      setFeatures([...features, currentFeature])
    }

    setIsEditDialogOpen(false)
    setCurrentFeature(null)
  }

  // Function to toggle feature availability for a plan
  const handleToggleAvailability = (plan: "basic" | "professional" | "enterprise") => {
    if (!currentFeature) return

    setCurrentFeature({
      ...currentFeature,
      availableIn: {
        ...currentFeature.availableIn,
        [plan]: !currentFeature.availableIn[plan],
      },
    })
  }

  // Get unique categories for filtering
  const categories = ["all", ...new Set(features.map((feature) => feature.category))]

  // Filter features by category
  const filteredFeatures =
    filterCategory === "all" ? features : features.filter((feature) => feature.category === filterCategory)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Features Management</h2>
        <Button onClick={handleAddFeature}>
          <Plus className="mr-2 h-4 w-4" /> Add Feature
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
          <CardTitle>Features</CardTitle>
          <CardDescription>Manage features available in different pricing tiers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Basic</TableHead>
                <TableHead className="text-center">Professional</TableHead>
                <TableHead className="text-center">Enterprise</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeatures.map((feature) => (
                <TableRow key={feature.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{feature.name}</div>
                      <div className="text-sm text-muted-foreground">{feature.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{feature.category}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {feature.availableIn.basic ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {feature.availableIn.professional ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {feature.availableIn.enterprise ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditFeature(feature)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteFeature(feature.id)}>
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredFeatures.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No features found. {filterCategory !== "all" && "Try changing the filter or "}
                    <Button variant="link" className="p-0 h-auto" onClick={handleAddFeature}>
                      add a new feature
                    </Button>
                    .
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Feature Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentFeature?.name ? "Edit Feature" : "Add Feature"}</DialogTitle>
            <DialogDescription>
              {currentFeature?.name
                ? "Make changes to the feature details below."
                : "Add a new feature to your pricing plans."}
            </DialogDescription>
          </DialogHeader>

          {currentFeature && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="feature-name">Feature Name</Label>
                <Input
                  id="feature-name"
                  value={currentFeature.name}
                  onChange={(e) => setCurrentFeature({ ...currentFeature, name: e.target.value })}
                  placeholder="e.g., Advanced Reporting"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feature-description">Description</Label>
                <Textarea
                  id="feature-description"
                  value={currentFeature.description}
                  onChange={(e) => setCurrentFeature({ ...currentFeature, description: e.target.value })}
                  placeholder="Briefly describe what this feature does"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feature-category">Category</Label>
                <Select
                  value={currentFeature.category}
                  onValueChange={(value) => setCurrentFeature({ ...currentFeature, category: value })}
                >
                  <SelectTrigger id="feature-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Core">Core</SelectItem>
                    <SelectItem value="Reporting">Reporting</SelectItem>
                    <SelectItem value="Communication">Communication</SelectItem>
                    <SelectItem value="Integration">Integration</SelectItem>
                    <SelectItem value="Customization">Customization</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Available In</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="available-basic"
                      checked={currentFeature.availableIn.basic}
                      onChange={() => handleToggleAvailability("basic")}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="available-basic">Basic Plan</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="available-professional"
                      checked={currentFeature.availableIn.professional}
                      onChange={() => handleToggleAvailability("professional")}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="available-professional">Professional Plan</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="available-enterprise"
                      checked={currentFeature.availableIn.enterprise}
                      onChange={() => handleToggleAvailability("enterprise")}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="available-enterprise">Enterprise Plan</Label>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveFeature}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

