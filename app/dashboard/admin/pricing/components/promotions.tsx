"use client"

import { useState } from "react"
import { CalendarIcon, Edit, Plus, Trash } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

// Mock data for promotions
const initialPromotions = [
  {
    id: "summer-sale",
    name: "Summer Sale",
    code: "SUMMER2023",
    description: "Special discount for summer 2023",
    type: "percentage",
    value: 20,
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-08-31"),
    applicableTo: ["all"],
    usageLimit: 1000,
    usageCount: 342,
    isActive: true,
  },
  {
    id: "new-school",
    name: "New School Discount",
    code: "NEWSCHOOL",
    description: "Special offer for new schools joining the platform",
    type: "percentage",
    value: 30,
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-12-31"),
    applicableTo: ["elementary", "middle", "high"],
    usageLimit: 500,
    usageCount: 127,
    isActive: true,
  },
  {
    id: "teacher-appreciation",
    name: "Teacher Appreciation",
    code: "TEACHERS2023",
    description: "Special discount for Teacher Appreciation Week",
    type: "fixed",
    value: 50,
    startDate: new Date("2023-05-01"),
    endDate: new Date("2023-05-07"),
    applicableTo: ["all"],
    usageLimit: 2000,
    usageCount: 1543,
    isActive: false,
  },
  {
    id: "back-to-school",
    name: "Back to School",
    code: "BACK2SCHOOL",
    description: "Special discount for the new school year",
    type: "percentage",
    value: 15,
    startDate: new Date("2023-08-15"),
    endDate: new Date("2023-09-30"),
    applicableTo: ["elementary", "middle", "high"],
    usageLimit: 3000,
    usageCount: 0,
    isActive: true,
  },
  {
    id: "free-trial",
    name: "30-Day Free Trial",
    code: "FREETRIAL",
    description: "Try our platform for 30 days at no cost",
    type: "trial",
    value: 30,
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-12-31"),
    applicableTo: ["all"],
    usageLimit: 10000,
    usageCount: 2345,
    isActive: true,
  },
]

export function Promotions() {
  const [promotions, setPromotions] = useState(initialPromotions)
  const [editingPromotion, setEditingPromotion] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSavePromotion = () => {
    if (editingPromotion) {
      const updatedPromotions = [...promotions]
      const promotionIndex = updatedPromotions.findIndex((p) => p.id === editingPromotion.id)

      if (promotionIndex >= 0) {
        updatedPromotions[promotionIndex] = editingPromotion
      } else {
        updatedPromotions.push(editingPromotion)
      }

      setPromotions(updatedPromotions)
      setIsDialogOpen(false)
      setEditingPromotion(null)
    }
  }

  const handleEditPromotion = (promotion) => {
    setEditingPromotion({ ...promotion })
    setIsDialogOpen(true)
  }

  const handleAddNewPromotion = () => {
    const newId = `promo-new-${Date.now()}`
    setEditingPromotion({
      id: newId,
      name: "New Promotion",
      code: "",
      description: "Description for the new promotion",
      type: "percentage",
      value: 10,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      applicableTo: ["all"],
      usageLimit: 1000,
      usageCount: 0,
      isActive: true,
    })
    setIsDialogOpen(true)
  }

  const handleDeletePromotion = (promotionId) => {
    if (confirm("Are you sure you want to delete this promotion? This action cannot be undone.")) {
      setPromotions(promotions.filter((p) => p.id !== promotionId))
    }
  }

  const toggleSchoolLevel = (level) => {
    if (editingPromotion) {
      let updatedApplicableTo = [...editingPromotion.applicableTo]

      if (level === "all") {
        // If "all" is selected, remove all other options
        updatedApplicableTo = ["all"]
      } else {
        // If a specific level is selected, remove "all" if it exists
        updatedApplicableTo = updatedApplicableTo.filter((l) => l !== "all")

        const levelIndex = updatedApplicableTo.indexOf(level)

        if (levelIndex >= 0) {
          updatedApplicableTo.splice(levelIndex, 1)
        } else {
          updatedApplicableTo.push(level)
        }
      }

      setEditingPromotion({
        ...editingPromotion,
        applicableTo: updatedApplicableTo,
      })
    }
  }

  const getPromotionStatusBadge = (promotion) => {
    const now = new Date()

    if (!promotion.isActive) {
      return <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">Inactive</span>
    }

    if (now < promotion.startDate) {
      return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Scheduled</span>
    }

    if (now > promotion.endDate) {
      return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Expired</span>
    }

    return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Promotions & Discounts</h2>
        <Button onClick={handleAddNewPromotion}>
          <Plus className="mr-2 h-4 w-4" /> Add New Promotion
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promotions.map((promotion) => (
          <Card key={promotion.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>{promotion.name}</CardTitle>
                    {getPromotionStatusBadge(promotion)}
                  </div>
                  <CardDescription className="mt-2">{promotion.description}</CardDescription>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEditPromotion(promotion)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeletePromotion(promotion.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Code:</span>
                  <span className="font-medium">{promotion.code}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Discount:</span>
                  <span className="font-medium">
                    {promotion.type === "percentage" && `${promotion.value}%`}
                    {promotion.type === "fixed" && `$${promotion.value}`}
                    {promotion.type === "trial" && `${promotion.value} days free`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Valid Period:</span>
                  <span className="font-medium">
                    {format(promotion.startDate, "MMM d, yyyy")} - {format(promotion.endDate, "MMM d, yyyy")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Usage:</span>
                  <span className="font-medium">
                    {promotion.usageCount} / {promotion.usageLimit}
                  </span>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Applicable to:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {promotion.applicableTo.includes("all") ? (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        All School Levels
                      </span>
                    ) : (
                      <>
                        {promotion.applicableTo.includes("elementary") && (
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Elementary</span>
                        )}
                        {promotion.applicableTo.includes("middle") && (
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Middle</span>
                        )}
                        {promotion.applicableTo.includes("high") && (
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">High</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center space-x-2">
                <Switch
                  id={`active-${promotion.id}`}
                  checked={promotion.isActive}
                  onCheckedChange={(checked) => {
                    const updatedPromotions = [...promotions]
                    const promotionIndex = updatedPromotions.findIndex((p) => p.id === promotion.id)
                    updatedPromotions[promotionIndex].isActive = checked
                    setPromotions(updatedPromotions)
                  }}
                />
                <Label htmlFor={`active-${promotion.id}`}>Active</Label>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingPromotion?.id.includes("new") ? "Add New Promotion" : "Edit Promotion"}</DialogTitle>
            <DialogDescription>
              Configure the details for this promotion. Changes will be applied across the platform.
            </DialogDescription>
          </DialogHeader>

          {editingPromotion && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="promotion-name">Promotion Name</Label>
                  <Input
                    id="promotion-name"
                    value={editingPromotion.name}
                    onChange={(e) => setEditingPromotion({ ...editingPromotion, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="promotion-code">Promotion Code</Label>
                  <Input
                    id="promotion-code"
                    value={editingPromotion.code}
                    onChange={(e) => setEditingPromotion({ ...editingPromotion, code: e.target.value.toUpperCase() })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="promotion-description">Description</Label>
                <Textarea
                  id="promotion-description"
                  value={editingPromotion.description}
                  onChange={(e) => setEditingPromotion({ ...editingPromotion, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="promotion-type">Discount Type</Label>
                  <Select
                    value={editingPromotion.type}
                    onValueChange={(value) => setEditingPromotion({ ...editingPromotion, type: value })}
                  >
                    <SelectTrigger id="promotion-type">
                      <SelectValue placeholder="Select discount type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage Discount</SelectItem>
                      <SelectItem value="fixed">Fixed Amount Discount</SelectItem>
                      <SelectItem value="trial">Free Trial Period</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="promotion-value">
                    {editingPromotion.type === "percentage" && "Discount Percentage (%)"}
                    {editingPromotion.type === "fixed" && "Discount Amount ($)"}
                    {editingPromotion.type === "trial" && "Trial Period (days)"}
                  </Label>
                  <Input
                    id="promotion-value"
                    type="number"
                    min="0"
                    value={editingPromotion.value}
                    onChange={(e) =>
                      setEditingPromotion({ ...editingPromotion, value: Number.parseFloat(e.target.value) })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {editingPromotion.startDate ? format(editingPromotion.startDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={editingPromotion.startDate}
                        onSelect={(date) => setEditingPromotion({ ...editingPromotion, startDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {editingPromotion.endDate ? format(editingPromotion.endDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={editingPromotion.endDate}
                        onSelect={(date) => setEditingPromotion({ ...editingPromotion, endDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="usage-limit">Usage Limit</Label>
                <Input
                  id="usage-limit"
                  type="number"
                  min="1"
                  value={editingPromotion.usageLimit}
                  onChange={(e) =>
                    setEditingPromotion({ ...editingPromotion, usageLimit: Number.parseInt(e.target.value) })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Applicable to School Levels</Label>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="all-levels"
                      checked={editingPromotion.applicableTo.includes("all")}
                      onCheckedChange={() => toggleSchoolLevel("all")}
                    />
                    <Label htmlFor="all-levels">All School Levels</Label>
                  </div>

                  {!editingPromotion.applicableTo.includes("all") && (
                    <>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="elementary-applicable"
                          checked={editingPromotion.applicableTo.includes("elementary")}
                          onCheckedChange={() => toggleSchoolLevel("elementary")}
                        />
                        <Label htmlFor="elementary-applicable">Elementary School</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="middle-applicable"
                          checked={editingPromotion.applicableTo.includes("middle")}
                          onCheckedChange={() => toggleSchoolLevel("middle")}
                        />
                        <Label htmlFor="middle-applicable">Middle School</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="high-applicable"
                          checked={editingPromotion.applicableTo.includes("high")}
                          onCheckedChange={() => toggleSchoolLevel("high")}
                        />
                        <Label htmlFor="high-applicable">High School</Label>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="promotion-active"
                  checked={editingPromotion.isActive}
                  onCheckedChange={(checked) => setEditingPromotion({ ...editingPromotion, isActive: checked })}
                />
                <Label htmlFor="promotion-active">Active</Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePromotion}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

