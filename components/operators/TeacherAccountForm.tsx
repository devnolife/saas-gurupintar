"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

// Available permissions
const availablePermissions = [
  { id: "create_rpp", label: "Create Lesson Plans (RPP)" },
  { id: "view_students", label: "View Student Information" },
  { id: "upload_materials", label: "Upload Teaching Materials" },
  { id: "manage_curriculum", label: "Manage Curriculum" },
  { id: "view_reports", label: "View Reports" },
  { id: "export_data", label: "Export Data" },
]

export function TeacherAccountForm({ onSubmit, initialData = null }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      email: "",
      role: "Teacher",
      status: "Active",
      permissions: ["create_rpp", "view_students"],
    },
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value, field) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleStatusChange = (checked) => {
    setFormData((prev) => ({ ...prev, status: checked ? "Active" : "Inactive" }))
  }

  const togglePermission = (permissionId) => {
    setFormData((prev) => {
      const permissions = prev.permissions || []
      return {
        ...prev,
        permissions: permissions.includes(permissionId)
          ? permissions.filter((id) => id !== permissionId)
          : [...permissions, permissionId],
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.email) {
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
        <div className="grid gap-2">
          <Label htmlFor="name">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="role">Role</Label>
          <Select value={formData.role} onValueChange={(value) => handleSelectChange(value, "role")}>
            <SelectTrigger id="role">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Teacher">Teacher</SelectItem>
              <SelectItem value="Senior Teacher">Senior Teacher</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="status">Account Status</Label>
          <div className="flex-1"></div>
          <Switch id="status" checked={formData.status === "Active"} onCheckedChange={handleStatusChange} />
          <Label htmlFor="status" className="text-sm text-muted-foreground">
            {formData.status}
          </Label>
        </div>

        <div className="grid gap-2">
          <Label>Permissions</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {availablePermissions.map((permission) => (
              <div key={permission.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`permission-${permission.id}`}
                  checked={(formData.permissions || []).includes(permission.id)}
                  onCheckedChange={() => togglePermission(permission.id)}
                />
                <Label htmlFor={`permission-${permission.id}`} className="text-sm">
                  {permission.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onSubmit(null)}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? "Update Account" : "Create Account"}</Button>
      </DialogFooter>
    </form>
  )
}

