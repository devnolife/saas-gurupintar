"use client"

import type React from "react"

import { useState } from "react"
import { type Operator, mockRoles, mockPermissions } from "@/lib/api/mockData/operators"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PermissionsManagerProps {
  operator: Operator
  onSuccess: () => void
  onCancel: () => void
}

export function PermissionsManager({ operator, onSuccess, onCancel }: PermissionsManagerProps) {
  const [selectedRoleId, setSelectedRoleId] = useState(operator.roleId)
  const [customPermissions, setCustomPermissions] = useState<string[]>(operator.customPermissions)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get the current role
  const currentRole = mockRoles.find((role) => role.id === selectedRoleId)

  // Get permissions from the selected role
  const rolePermissions = currentRole?.permissions || []

  // Group permissions by module
  const permissionsByModule: Record<string, typeof mockPermissions> = {}
  mockPermissions.forEach((permission) => {
    if (!permissionsByModule[permission.module]) {
      permissionsByModule[permission.module] = []
    }
    permissionsByModule[permission.module].push(permission)
  })

  const handleRoleChange = (roleId: string) => {
    setSelectedRoleId(roleId)

    // Reset custom permissions when role changes
    setCustomPermissions([])
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setCustomPermissions((prev) => [...prev, permissionId])
    } else {
      setCustomPermissions((prev) => prev.filter((id) => id !== permissionId))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Permissions updated",
        description: "The operator permissions have been updated successfully.",
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update permissions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="role">Role</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Select a role to define the base permissions for this operator
          </p>
          <Select value={selectedRoleId} onValueChange={handleRoleChange}>
            <SelectTrigger id="role" className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {mockRoles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name} - {role.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>These permissions are granted by the selected role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {rolePermissions.map((permId) => {
                const permission = mockPermissions.find((p) => p.id === permId)
                return permission ? (
                  <Badge key={permId} variant="secondary">
                    {permission.name}
                  </Badge>
                ) : null
              })}
              {rolePermissions.length === 0 && (
                <p className="text-sm text-muted-foreground">No permissions granted by this role</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom Permissions</CardTitle>
            <CardDescription>Add additional permissions beyond the selected role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(permissionsByModule).map(([module, permissions]) => (
                <div key={module} className="space-y-2">
                  <h4 className="font-medium">{module}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {permissions.map((permission) => {
                      const isInRole = rolePermissions.includes(permission.id)
                      const isCustom = customPermissions.includes(permission.id)

                      return (
                        <div key={permission.id} className="flex items-start space-x-2">
                          <Checkbox
                            id={permission.id}
                            checked={isInRole || isCustom}
                            disabled={isInRole}
                            onCheckedChange={(checked) => {
                              if (!isInRole) {
                                handlePermissionChange(permission.id, checked as boolean)
                              }
                            }}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label htmlFor={permission.id} className={isInRole ? "text-muted-foreground" : ""}>
                              {permission.name}
                              {isInRole && (
                                <Badge variant="outline" className="ml-2 text-xs">
                                  From Role
                                </Badge>
                              )}
                            </Label>
                            <p className="text-sm text-muted-foreground">{permission.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Permissions"}
        </Button>
      </div>
    </form>
  )
}

