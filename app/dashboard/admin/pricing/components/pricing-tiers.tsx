"use client"

import { useState } from "react"
import { Copy, Edit, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data for pricing tiers (same as before)
const initialTiers = {
  elementary: [
    {
      id: "elem-basic",
      name: "Basic",
      description: "Essential lesson planning tools for elementary educators",
      monthlyPrice: 29.99,
      annualPrice: 299.99,
      features: [
        "Basic lesson plan templates",
        "Limited resource library access",
        "5 lesson plans per month",
        "Email support",
      ],
      isPopular: false,
      isActive: true,
    },
    {
      id: "elem-standard",
      name: "Standard",
      description: "Comprehensive tools for elementary classroom management",
      monthlyPrice: 49.99,
      annualPrice: 499.99,
      features: [
        "Advanced lesson plan templates",
        "Full resource library access",
        "25 lesson plans per month",
        "Priority email support",
        "Basic analytics",
      ],
      isPopular: true,
      isActive: true,
    },
    {
      id: "elem-premium",
      name: "Premium",
      description: "Complete solution for elementary education excellence",
      monthlyPrice: 79.99,
      annualPrice: 799.99,
      features: [
        "All Standard features",
        "Unlimited lesson plans",
        "Advanced analytics",
        "Curriculum mapping tools",
        "Phone support",
        "Custom resource creation",
      ],
      isPopular: false,
      isActive: true,
    },
  ],
  middle: [
    {
      id: "mid-basic",
      name: "Basic",
      description: "Essential tools for middle school educators",
      monthlyPrice: 39.99,
      annualPrice: 399.99,
      features: [
        "Basic lesson plan templates",
        "Limited resource library access",
        "10 lesson plans per month",
        "Email support",
      ],
      isPopular: false,
      isActive: true,
    },
    {
      id: "mid-standard",
      name: "Standard",
      description: "Comprehensive tools for middle school classroom management",
      monthlyPrice: 59.99,
      annualPrice: 599.99,
      features: [
        "Advanced lesson plan templates",
        "Full resource library access",
        "35 lesson plans per month",
        "Priority email support",
        "Basic analytics",
      ],
      isPopular: true,
      isActive: true,
    },
    {
      id: "mid-premium",
      name: "Premium",
      description: "Complete solution for middle school education excellence",
      monthlyPrice: 89.99,
      annualPrice: 899.99,
      features: [
        "All Standard features",
        "Unlimited lesson plans",
        "Advanced analytics",
        "Curriculum mapping tools",
        "Phone support",
        "Custom resource creation",
      ],
      isPopular: false,
      isActive: true,
    },
  ],
  high: [
    {
      id: "high-basic",
      name: "Basic",
      description: "Essential tools for high school educators",
      monthlyPrice: 49.99,
      annualPrice: 499.99,
      features: [
        "Basic lesson plan templates",
        "Limited resource library access",
        "15 lesson plans per month",
        "Email support",
      ],
      isPopular: false,
      isActive: true,
    },
    {
      id: "high-standard",
      name: "Standard",
      description: "Comprehensive tools for high school classroom management",
      monthlyPrice: 79.99,
      annualPrice: 799.99,
      features: [
        "Advanced lesson plan templates",
        "Full resource library access",
        "50 lesson plans per month",
        "Priority email support",
        "Basic analytics",
      ],
      isPopular: true,
      isActive: true,
    },
    {
      id: "high-premium",
      name: "Premium",
      description: "Complete solution for high school education excellence",
      monthlyPrice: 119.99,
      annualPrice: 1199.99,
      features: [
        "All Standard features",
        "Unlimited lesson plans",
        "Advanced analytics",
        "Curriculum mapping tools",
        "Phone support",
        "Custom resource creation",
        "College prep resources",
      ],
      isPopular: false,
      isActive: true,
    },
  ],
}

export function PricingTiers() {
  const [tiers, setTiers] = useState(initialTiers)
  const [activeSchoolLevel, setActiveSchoolLevel] = useState("elementary")
  const [editingTier, setEditingTier] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newFeature, setNewFeature] = useState("")

  // All the handler functions remain the same
  const handleAddFeature = () => {
    if (newFeature.trim() && editingTier) {
      setEditingTier({
        ...editingTier,
        features: [...editingTier.features, newFeature.trim()],
      })
      setNewFeature("")
    }
  }

  const handleRemoveFeature = (index) => {
    if (editingTier) {
      const updatedFeatures = [...editingTier.features]
      updatedFeatures.splice(index, 1)
      setEditingTier({
        ...editingTier,
        features: updatedFeatures,
      })
    }
  }

  const handleSaveTier = () => {
    if (editingTier) {
      const updatedTiers = { ...tiers }
      const tierIndex = updatedTiers[activeSchoolLevel].findIndex((t) => t.id === editingTier.id)

      if (tierIndex >= 0) {
        updatedTiers[activeSchoolLevel][tierIndex] = editingTier
      } else {
        updatedTiers[activeSchoolLevel].push(editingTier)
      }

      setTiers(updatedTiers)
      setIsDialogOpen(false)
      setEditingTier(null)
    }
  }

  const handleEditTier = (tier) => {
    setEditingTier({ ...tier })
    setIsDialogOpen(true)
  }

  const handleAddNewTier = () => {
    const newId = `${activeSchoolLevel}-new-${Date.now()}`
    setEditingTier({
      id: newId,
      name: "New Tier",
      description: "Description for the new tier",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [],
      isPopular: false,
      isActive: true,
    })
    setIsDialogOpen(true)
  }

  const handleDuplicateTier = (tier) => {
    const newTier = {
      ...tier,
      id: `${tier.id}-copy-${Date.now()}`,
      name: `${tier.name} (Copy)`,
      isPopular: false,
    }

    const updatedTiers = { ...tiers }
    updatedTiers[activeSchoolLevel].push(newTier)
    setTiers(updatedTiers)
  }

  const handleDeleteTier = (tierId) => {
    if (confirm("Are you sure you want to delete this pricing tier? This action cannot be undone.")) {
      const updatedTiers = { ...tiers }
      updatedTiers[activeSchoolLevel] = updatedTiers[activeSchoolLevel].filter((t) => t.id !== tierId)
      setTiers(updatedTiers)
    }
  }

  const handleSetPopular = (tierId) => {
    const updatedTiers = { ...tiers }
    updatedTiers[activeSchoolLevel] = updatedTiers[activeSchoolLevel].map((t) => ({
      ...t,
      isPopular: t.id === tierId,
    }))
    setTiers(updatedTiers)
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Pricing Tiers</h2>
          <p className="text-muted-foreground mt-1">Manage pricing tiers for different school levels</p>
        </div>
        <Button onClick={handleAddNewTier} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" /> Add New Tier
        </Button>
      </div>

      <div className="bg-muted/30 p-1 rounded-lg mb-6">
        <Tabs value={activeSchoolLevel} onValueChange={setActiveSchoolLevel}>
          <TabsList className="grid grid-cols-3 gap-1 w-full">
            <TabsTrigger value="elementary" className="py-2.5">
              Elementary School
            </TabsTrigger>
            <TabsTrigger value="middle" className="py-2.5">
              Middle School
            </TabsTrigger>
            <TabsTrigger value="high" className="py-2.5">
              High School
            </TabsTrigger>
          </TabsList>

          {["elementary", "middle", "high"].map((level) => (
            <TabsContent key={level} value={level} className="mt-6 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tiers[level].map((tier) => (
                  <Card
                    key={tier.id}
                    className={`overflow-hidden transition-all hover:shadow-md ${tier.isPopular ? "border-primary shadow-sm" : "border"}`}
                  >
                    {tier.isPopular && (
                      <div className="bg-primary text-primary-foreground text-center py-1.5 text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{tier.name}</CardTitle>
                          <CardDescription className="mt-2 line-clamp-2">{tier.description}</CardDescription>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEditTier(tier)} className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDuplicateTier(tier)}
                            className="h-8 w-8"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteTier(tier.id)}
                            className="h-8 w-8"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-6">
                      <div className="space-y-4">
                        <div className="flex items-baseline">
                          <div className="text-3xl font-bold">${tier.monthlyPrice}</div>
                          <span className="text-sm font-normal text-muted-foreground ml-1">/month</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ${tier.annualPrice}/year
                          <Badge variant="outline" className="ml-2 font-normal">
                            Save {Math.round(100 - (tier.annualPrice / (tier.monthlyPrice * 12)) * 100)}%
                          </Badge>
                        </div>

                        <div className="pt-4 border-t mt-4">
                          <h4 className="text-sm font-medium mb-3">Features:</h4>
                          <ul className="space-y-2.5">
                            {tier.features.map((feature, index) => (
                              <li key={index} className="text-sm flex items-start">
                                <span className="text-primary mr-2 mt-0.5">✓</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2 border-t bg-muted/20">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`active-${tier.id}`}
                          checked={tier.isActive}
                          onCheckedChange={(checked) => {
                            const updatedTiers = { ...tiers }
                            const tierIndex = updatedTiers[level].findIndex((t) => t.id === tier.id)
                            updatedTiers[level][tierIndex].isActive = checked
                            setTiers(updatedTiers)
                          }}
                        />
                        <Label htmlFor={`active-${tier.id}`}>Active</Label>
                      </div>
                      {!tier.isPopular && (
                        <Button variant="outline" size="sm" onClick={() => handleSetPopular(tier.id)}>
                          Set as Popular
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingTier?.id.includes("new") ? "Add New Pricing Tier" : "Edit Pricing Tier"}</DialogTitle>
            <DialogDescription>
              Configure the details for this pricing tier. Changes will be applied across the platform.
            </DialogDescription>
          </DialogHeader>

          {editingTier && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tier-name">Tier Name</Label>
                  <Input
                    id="tier-name"
                    value={editingTier.name}
                    onChange={(e) => setEditingTier({ ...editingTier, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tier-id">Tier ID</Label>
                  <Input id="tier-id" value={editingTier.id} disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tier-description">Description</Label>
                <Textarea
                  id="tier-description"
                  value={editingTier.description}
                  onChange={(e) => setEditingTier({ ...editingTier, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthly-price">Monthly Price ($)</Label>
                  <Input
                    id="monthly-price"
                    type="number"
                    step="0.01"
                    value={editingTier.monthlyPrice}
                    onChange={(e) =>
                      setEditingTier({ ...editingTier, monthlyPrice: Number.parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annual-price">Annual Price ($)</Label>
                  <Input
                    id="annual-price"
                    type="number"
                    step="0.01"
                    value={editingTier.annualPrice}
                    onChange={(e) => setEditingTier({ ...editingTier, annualPrice: Number.parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-3 border p-4 rounded-md">
                <Label className="text-base">Features</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature Description</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {editingTier.features.map((feature, index) => (
                      <TableRow key={index}>
                        <TableCell>{feature}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveFeature(index)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>
                        <Input
                          placeholder="Add new feature..."
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              handleAddFeature()
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={handleAddFeature}>
                          Add
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between border-t pt-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="tier-active"
                    checked={editingTier.isActive}
                    onCheckedChange={(checked) => setEditingTier({ ...editingTier, isActive: checked })}
                  />
                  <Label htmlFor="tier-active">Active</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="tier-popular"
                    checked={editingTier.isPopular}
                    onCheckedChange={(checked) => setEditingTier({ ...editingTier, isPopular: checked })}
                  />
                  <Label htmlFor="tier-popular">Mark as Popular</Label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTier}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

