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
import { Switch } from "@/components/ui/switch"
import { MoreHorizontal, Plus, Edit, Trash, Check } from "lucide-react"

// Define types
interface SubscriptionPeriod {
  id: string
  name: string
  months: number
  discountPercentage: number
  isDefault: boolean
}

export function SubscriptionPeriods() {
  // Sample initial data
  const [periods, setPeriods] = useState<SubscriptionPeriod[]>([
    {
      id: "1",
      name: "Monthly",
      months: 1,
      discountPercentage: 0,
      isDefault: true,
    },
    {
      id: "2",
      name: "Quarterly",
      months: 3,
      discountPercentage: 10,
      isDefault: false,
    },
    {
      id: "3",
      name: "Annual",
      months: 12,
      discountPercentage: 20,
      isDefault: false,
    },
  ])

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentPeriod, setCurrentPeriod] = useState<SubscriptionPeriod | null>(null)

  // Function to add a new subscription period
  const handleAddPeriod = () => {
    const newPeriod: SubscriptionPeriod = {
      id: Date.now().toString(),
      name: "New Period",
      months: 1,
      discountPercentage: 0,
      isDefault: false,
    }

    setCurrentPeriod(newPeriod)
    setIsEditDialogOpen(true)
  }

  // Function to edit a subscription period
  const handleEditPeriod = (period: SubscriptionPeriod) => {
    setCurrentPeriod({ ...period })
    setIsEditDialogOpen(true)
  }

  // Function to delete a subscription period
  const handleDeletePeriod = (periodId: string) => {
    setPeriods(periods.filter((period) => period.id !== periodId))
  }

  // Function to set a period as default
  const handleSetDefault = (periodId: string) => {
    setPeriods(
      periods.map((period) => ({
        ...period,
        isDefault: period.id === periodId,
      })),
    )
  }

  // Function to save period changes
  const handleSavePeriod = () => {
    if (!currentPeriod) return

    const periodExists = periods.some((period) => period.id === currentPeriod.id)

    if (periodExists) {
      setPeriods(periods.map((period) => (period.id === currentPeriod.id ? currentPeriod : period)))
    } else {
      setPeriods([...periods, currentPeriod])
    }

    // If this period is set as default, update all others
    if (currentPeriod.isDefault) {
      setPeriods((prevPeriods) =>
        prevPeriods.map((period) => ({
          ...period,
          isDefault: period.id === currentPeriod.id,
        })),
      )
    }

    setIsEditDialogOpen(false)
    setCurrentPeriod(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Subscription Periods</h2>
        <Button onClick={handleAddPeriod}>
          <Plus className="mr-2 h-4 w-4" /> Add Period
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {periods.map((period) => (
          <Card key={period.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    {period.name}
                    {period.isDefault && (
                      <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">Default</span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {period.months} month{period.months > 1 ? "s" : ""}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditPeriod(period)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSetDefault(period.id)}>
                      <Check className="mr-2 h-4 w-4" /> Set as Default
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeletePeriod(period.id)}
                      className="text-red-600"
                      disabled={period.isDefault}
                    >
                      <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {period.discountPercentage}%<span className="text-sm font-normal ml-2">discount</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Period Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentPeriod?.id ? "Edit Subscription Period" : "Add Subscription Period"}</DialogTitle>
            <DialogDescription>Make changes to the subscription period details below.</DialogDescription>
          </DialogHeader>

          {currentPeriod && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={currentPeriod.name}
                  onChange={(e) => setCurrentPeriod({ ...currentPeriod, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="months">Duration (months)</Label>
                <Input
                  id="months"
                  type="number"
                  min="1"
                  value={currentPeriod.months}
                  onChange={(e) => setCurrentPeriod({ ...currentPeriod, months: Number(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount">Discount Percentage</Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={currentPeriod.discountPercentage}
                  onChange={(e) => setCurrentPeriod({ ...currentPeriod, discountPercentage: Number(e.target.value) })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="default"
                  checked={currentPeriod.isDefault}
                  onCheckedChange={(checked) => setCurrentPeriod({ ...currentPeriod, isDefault: checked })}
                />
                <Label htmlFor="default">Set as Default Period</Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePeriod}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

