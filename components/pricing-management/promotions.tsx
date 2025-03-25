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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { MoreHorizontal, Plus, Edit, Trash, Calendar, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Define types
interface Promotion {
  id: string
  name: string
  code: string
  description: string
  discountType: "percentage" | "fixed"
  discountValue: number
  startDate: string
  endDate: string | null
  isActive: boolean
  usageLimit: number | null
  currentUsage: number
}

export function Promotions() {
  // Sample initial data
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: "1",
      name: "Summer Special",
      code: "SUMMER2023",
      description: "Summer discount for all plans",
      discountType: "percentage",
      discountValue: 15,
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      isActive: true,
      usageLimit: 100,
      currentUsage: 45,
    },
    {
      id: "2",
      name: "New Customer",
      code: "WELCOME",
      description: "Discount for new customers",
      discountType: "fixed",
      discountValue: 50,
      startDate: "2023-01-01",
      endDate: null,
      isActive: true,
      usageLimit: null,
      currentUsage: 120,
    },
  ])

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentPromotion, setCurrentPromotion] = useState<Promotion | null>(null)

  // Function to add a new promotion
  const handleAddPromotion = () => {
    const today = new Date().toISOString().split("T")[0]

    const newPromotion: Promotion = {
      id: Date.now().toString(),
      name: "New Promotion",
      code: "NEWCODE",
      description: "",
      discountType: "percentage",
      discountValue: 10,
      startDate: today,
      endDate: null,
      isActive: true,
      usageLimit: null,
      currentUsage: 0,
    }

    setCurrentPromotion(newPromotion)
    setIsEditDialogOpen(true)
  }

  // Function to edit a promotion
  const handleEditPromotion = (promotion: Promotion) => {
    setCurrentPromotion({ ...promotion })
    setIsEditDialogOpen(true)
  }

  // Function to delete a promotion
  const handleDeletePromotion = (promotionId: string) => {
    setPromotions(promotions.filter((promotion) => promotion.id !== promotionId))
  }

  // Function to toggle promotion active status
  const handleToggleActive = (promotionId: string) => {
    setPromotions(
      promotions.map((promotion) =>
        promotion.id === promotionId ? { ...promotion, isActive: !promotion.isActive } : promotion,
      ),
    )
  }

  // Function to save promotion changes
  const handleSavePromotion = () => {
    if (!currentPromotion) return

    const promotionExists = promotions.some((promotion) => promotion.id === currentPromotion.id)

    if (promotionExists) {
      setPromotions(
        promotions.map((promotion) => (promotion.id === currentPromotion.id ? currentPromotion : promotion)),
      )
    } else {
      setPromotions([...promotions, currentPromotion])
    }

    setIsEditDialogOpen(false)
    setCurrentPromotion(null)
  }

  // Function to format discount display
  const formatDiscount = (promotion: Promotion) => {
    if (promotion.discountType === "percentage") {
      return `${promotion.discountValue}%`
    } else {
      return `$${promotion.discountValue}`
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Promotions</h2>
        <Button onClick={handleAddPromotion}>
          <Plus className="mr-2 h-4 w-4" /> Add Promotion
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promotions.map((promotion) => (
          <Card key={promotion.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>{promotion.name}</CardTitle>
                    <Badge variant={promotion.isActive ? "default" : "secondary"}>
                      {promotion.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <CardDescription>{promotion.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditPromotion(promotion)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleActive(promotion.id)}>
                      <Switch className="mr-2" checked={promotion.isActive} />
                      {promotion.isActive ? "Deactivate" : "Activate"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeletePromotion(promotion.id)} className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium mr-2">Code:</span>
                  <code className="px-2 py-1 bg-muted rounded text-sm">{promotion.code}</code>
                </div>

                <div className="flex items-center">
                  <span className="font-medium mr-2">Discount:</span>
                  <span>{formatDiscount(promotion)}</span>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium mr-2">Period:</span>
                  <span>
                    {new Date(promotion.startDate).toLocaleDateString()}
                    {promotion.endDate ? ` - ${new Date(promotion.endDate).toLocaleDateString()}` : " - No end date"}
                  </span>
                </div>

                {promotion.usageLimit && (
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Usage:</span>
                    <span>
                      {promotion.currentUsage} / {promotion.usageLimit}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Promotion Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{currentPromotion?.id ? "Edit Promotion" : "Add Promotion"}</DialogTitle>
            <DialogDescription>Make changes to the promotion details below.</DialogDescription>
          </DialogHeader>

          {currentPromotion && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={currentPromotion.name}
                  onChange={(e) => setCurrentPromotion({ ...currentPromotion, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Promotion Code</Label>
                <Input
                  id="code"
                  value={currentPromotion.code}
                  onChange={(e) => setCurrentPromotion({ ...currentPromotion, code: e.target.value.toUpperCase() })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={currentPromotion.description}
                  onChange={(e) => setCurrentPromotion({ ...currentPromotion, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount-type">Discount Type</Label>
                  <Select
                    value={currentPromotion.discountType}
                    onValueChange={(value: "percentage" | "fixed") =>
                      setCurrentPromotion({ ...currentPromotion, discountType: value })
                    }
                  >
                    <SelectTrigger id="discount-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount-value">Discount Value</Label>
                  <Input
                    id="discount-value"
                    type="number"
                    min="0"
                    value={currentPromotion.discountValue}
                    onChange={(e) =>
                      setCurrentPromotion({ ...currentPromotion, discountValue: Number(e.target.value) })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={currentPromotion.startDate}
                    onChange={(e) => setCurrentPromotion({ ...currentPromotion, startDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date (Optional)</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={currentPromotion.endDate || ""}
                    onChange={(e) =>
                      setCurrentPromotion({
                        ...currentPromotion,
                        endDate: e.target.value || null,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="usage-limit">Usage Limit (Optional)</Label>
                <Input
                  id="usage-limit"
                  type="number"
                  min="0"
                  value={currentPromotion.usageLimit || ""}
                  onChange={(e) =>
                    setCurrentPromotion({
                      ...currentPromotion,
                      usageLimit: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  placeholder="Unlimited"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={currentPromotion.isActive}
                  onCheckedChange={(checked) => setCurrentPromotion({ ...currentPromotion, isActive: checked })}
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePromotion}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

