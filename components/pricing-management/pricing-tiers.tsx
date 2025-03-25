"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
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
import { MoreHorizontal, Plus, Edit, Copy, Trash, Star, Check, X } from "lucide-react"

// Define types
interface Feature {
  id: string
  name: string
  included: boolean
}

interface PricingTier {
  id: string
  name: string
  description: string
  price: number
  isPopular: boolean
  features: Feature[]
}

export function PricingTiers() {
  // Sample initial data
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([
    {
      id: "1",
      name: "Basic",
      description: "For small schools just getting started",
      price: 99,
      isPopular: false,
      features: [
        { id: "f1", name: "Up to 100 students", included: true },
        { id: "f2", name: "Basic reporting", included: true },
        { id: "f3", name: "Email support", included: true },
        { id: "f4", name: "Advanced analytics", included: false },
      ],
    },
    {
      id: "2",
      name: "Professional",
      description: "For growing schools with more needs",
      price: 199,
      isPopular: true,
      features: [
        { id: "f1", name: "Up to 500 students", included: true },
        { id: "f2", name: "Advanced reporting", included: true },
        { id: "f3", name: "Priority email support", included: true },
        { id: "f4", name: "Advanced analytics", included: true },
      ],
    },
    {
      id: "3",
      name: "Enterprise",
      description: "For large institutions with complex requirements",
      price: 399,
      isPopular: false,
      features: [
        { id: "f1", name: "Unlimited students", included: true },
        { id: "f2", name: "Custom reporting", included: true },
        { id: "f3", name: "24/7 phone support", included: true },
        { id: "f4", name: "Advanced analytics", included: true },
      ],
    },
  ])

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentTier, setCurrentTier] = useState<PricingTier | null>(null)
  const [isAddFeatureDialogOpen, setIsAddFeatureDialogOpen] = useState(false)
  const [newFeature, setNewFeature] = useState("")

  // Function to add a new pricing tier
  const handleAddTier = () => {
    const newTier: PricingTier = {
      id: Date.now().toString(),
      name: "New Tier",
      description: "Description for the new tier",
      price: 0,
      isPopular: false,
      features: [],
    }

    setCurrentTier(newTier)
    setIsEditDialogOpen(true)
  }

  // Function to edit a pricing tier
  const handleEditTier = (tier: PricingTier) => {
    setCurrentTier({ ...tier })
    setIsEditDialogOpen(true)
  }

  // Function to duplicate a pricing tier
  const handleDuplicateTier = (tier: PricingTier) => {
    const duplicatedTier: PricingTier = {
      ...tier,
      id: Date.now().toString(),
      name: `${tier.name} (Copy)`,
      isPopular: false,
    }

    setPricingTiers([...pricingTiers, duplicatedTier])
  }

  // Function to delete a pricing tier
  const handleDeleteTier = (tierId: string) => {
    setPricingTiers(pricingTiers.filter((tier) => tier.id !== tierId))
  }

  // Function to set a tier as most popular
  const handleSetPopular = (tierId: string) => {
    setPricingTiers(
      pricingTiers.map((tier) => ({
        ...tier,
        isPopular: tier.id === tierId,
      })),
    )
  }

  // Function to save tier changes
  const handleSaveTier = () => {
    if (!currentTier) return

    const tierExists = pricingTiers.some((tier) => tier.id === currentTier.id)

    if (tierExists) {
      setPricingTiers(pricingTiers.map((tier) => (tier.id === currentTier.id ? currentTier : tier)))
    } else {
      setPricingTiers([...pricingTiers, currentTier])
    }

    setIsEditDialogOpen(false)
    setCurrentTier(null)
  }

  // Function to add a new feature to a tier
  const handleAddFeature = () => {
    if (!currentTier || !newFeature.trim()) return

    const newFeatureObj: Feature = {
      id: Date.now().toString(),
      name: newFeature,
      included: true,
    }

    setCurrentTier({
      ...currentTier,
      features: [...currentTier.features, newFeatureObj],
    })

    setNewFeature("")
    setIsAddFeatureDialogOpen(false)
  }

  // Function to toggle feature inclusion
  const handleToggleFeature = (featureId: string) => {
    if (!currentTier) return

    setCurrentTier({
      ...currentTier,
      features: currentTier.features.map((feature) =>
        feature.id === featureId ? { ...feature, included: !feature.included } : feature,
      ),
    })
  }

  // Function to remove a feature
  const handleRemoveFeature = (featureId: string) => {
    if (!currentTier) return

    setCurrentTier({
      ...currentTier,
      features: currentTier.features.filter((feature) => feature.id !== featureId),
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Pricing Tiers</h2>
        <Button onClick={handleAddTier}>
          <Plus className="mr-2 h-4 w-4" /> Add Tier
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricingTiers.map((tier) => (
          <Card key={tier.id} className="relative">
            {tier.isPopular && <Badge className="absolute top-4 right-4 bg-yellow-500">Most Popular</Badge>}
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditTier(tier)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicateTier(tier)}>
                      <Copy className="mr-2 h-4 w-4" /> Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSetPopular(tier.id)}>
                      <Star className="mr-2 h-4 w-4" /> Set as Most Popular
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteTier(tier.id)} className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">
                ${tier.price}
                <span className="text-sm font-normal">/month</span>
              </div>
              <ul className="space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature.id} className="flex items-center">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    {feature.name}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Tier Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{currentTier?.id ? "Edit Pricing Tier" : "Add Pricing Tier"}</DialogTitle>
            <DialogDescription>Make changes to the pricing tier details below.</DialogDescription>
          </DialogHeader>

          {currentTier && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={currentTier.name}
                    onChange={(e) => setCurrentTier({ ...currentTier, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($/month)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={currentTier.price}
                    onChange={(e) => setCurrentTier({ ...currentTier, price: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={currentTier.description}
                  onChange={(e) => setCurrentTier({ ...currentTier, description: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="popular"
                  checked={currentTier.isPopular}
                  onCheckedChange={(checked) => setCurrentTier({ ...currentTier, isPopular: checked })}
                />
                <Label htmlFor="popular">Set as Most Popular</Label>
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
                      <TableHead className="w-[100px]">Included</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentTier.features.map((feature) => (
                      <TableRow key={feature.id}>
                        <TableCell>{feature.name}</TableCell>
                        <TableCell>
                          <Switch checked={feature.included} onCheckedChange={() => handleToggleFeature(feature.id)} />
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveFeature(feature.id)}>
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {currentTier.features.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                          No features added yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTier}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Feature Dialog */}
      <Dialog open={isAddFeatureDialogOpen} onOpenChange={setIsAddFeatureDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Feature</DialogTitle>
            <DialogDescription>Add a new feature to this pricing tier.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="feature-name">Feature Name</Label>
              <Input
                id="feature-name"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="e.g., 24/7 Support"
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

