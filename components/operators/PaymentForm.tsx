"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { DialogFooter } from "@/components/ui/dialog"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Payment methods
const paymentMethods = [
  { id: "bank_transfer", label: "Bank Transfer" },
  { id: "cash", label: "Cash" },
  { id: "digital_wallet", label: "Digital Wallet" },
]

export function PaymentForm({ onSubmit, teacher = null }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    teacherId: teacher?.id || "",
    teacherName: teacher?.name || "",
    amount: "",
    date: new Date(),
    method: "bank_transfer",
    description: "",
    reference: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value, field) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.amount || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Submit form
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 py-4">
        {!teacher && (
          <div className="grid gap-2">
            <Label htmlFor="teacherName">
              Teacher Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="teacherName"
              name="teacherName"
              value={formData.teacherName}
              onChange={handleInputChange}
              required
              disabled={!!teacher}
            />
          </div>
        )}

        <div className="grid gap-2">
          <Label htmlFor="amount">
            Amount (Rp) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="amount"
            name="amount"
            type="text"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="e.g., 5.000.000"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="date">Payment Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.date ? format(formData.date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={formData.date} onSelect={handleDateChange} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="method">Payment Method</Label>
          <Select value={formData.method} onValueChange={(value) => handleSelectChange(value, "method")}>
            <SelectTrigger id="method">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map((method) => (
                <SelectItem key={method.id} value={method.id}>
                  {method.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">
            Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="e.g., Monthly salary - July 2023"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="reference">Reference Number</Label>
          <Input
            id="reference"
            name="reference"
            value={formData.reference}
            onChange={handleInputChange}
            placeholder="e.g., PAY-2023-07-001"
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onSubmit(null)}>
          Cancel
        </Button>
        <Button type="submit">Process Payment</Button>
      </DialogFooter>
    </form>
  )
}

