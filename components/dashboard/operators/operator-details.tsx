"use client"

import type { Operator } from "@/lib/api/mockData/operators"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "./status-badge"
import { PackageBadge } from "./package-badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatDistanceToNow } from "date-fns"

interface OperatorDetailsProps {
  operator: Operator | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OperatorDetails({ operator, open, onOpenChange }: OperatorDetailsProps) {
  if (!operator) return null

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString()
    } catch (e) {
      return "Invalid date"
    }
  }

  const getTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (e) {
      return "Unknown"
    }
  }

  const quotaPercentage = Math.round((operator.quotaUsage.used / operator.quotaUsage.total) * 100)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Operator Details</DialogTitle>
          <DialogDescription>View detailed information about this operator</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-4 py-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={operator.avatar} alt={operator.name} />
            <AvatarFallback>{operator.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{operator.name}</h2>
            <div className="flex flex-wrap gap-2 items-center mt-1">
              <StatusBadge status={operator.status} />
              <span className="text-sm text-muted-foreground">{operator.email}</span>
              <span className="text-sm text-muted-foreground">{operator.phone}</span>
            </div>
            <div className="mt-2">
              <span className="text-sm font-medium">Role: </span>
              <span className="text-sm">{operator.role}</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="quota">Quota</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm font-medium">Account Type:</span>
                    <span className="text-sm">{operator.accountType}</span>

                    <span className="text-sm font-medium">Region:</span>
                    <span className="text-sm">{operator.region}</span>

                    <span className="text-sm font-medium">Joined:</span>
                    <span className="text-sm">{formatDate(operator.joinDate)}</span>

                    <span className="text-sm font-medium">Last Active:</span>
                    <span className="text-sm">{getTimeAgo(operator.lastActive)}</span>

                    <span className="text-sm font-medium">Schools:</span>
                    <span className="text-sm">{operator.schools}</span>

                    <span className="text-sm font-medium">Active Users:</span>
                    <span className="text-sm">{operator.activeUsers.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm font-medium">Email:</span>
                    <span className="text-sm">{operator.email}</span>

                    <span className="text-sm font-medium">Phone:</span>
                    <span className="text-sm">{operator.phone}</span>

                    <span className="text-sm font-medium">Address:</span>
                    <span className="text-sm">
                      {operator.address.street}, {operator.address.city}, {operator.address.state}{" "}
                      {operator.address.zipCode}
                    </span>

                    <span className="text-sm font-medium">Country:</span>
                    <span className="text-sm">{operator.address.country}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm font-medium">Company:</span>
                    <span className="text-sm">{operator.company.name}</span>

                    <span className="text-sm font-medium">Position:</span>
                    <span className="text-sm">{operator.company.position}</span>

                    <span className="text-sm font-medium">Department:</span>
                    <span className="text-sm">{operator.company.department}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm font-medium">Two-Factor Auth:</span>
                    <span className="text-sm">{operator.settings.twoFactorEnabled ? "Enabled" : "Disabled"}</span>

                    <span className="text-sm font-medium">Notifications:</span>
                    <span className="text-sm">{operator.settings.notificationsEnabled ? "Enabled" : "Disabled"}</span>

                    <span className="text-sm font-medium">Language:</span>
                    <span className="text-sm">{operator.settings.language}</span>

                    <span className="text-sm font-medium">Timezone:</span>
                    <span className="text-sm">{operator.settings.timezone}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="packages" className="space-y-4">
            {operator.packages.map((pkg) => (
              <Card key={pkg.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{pkg.name}</CardTitle>
                    <PackageBadge tier={pkg.tier} />
                  </div>
                  <CardDescription>
                    Purchased: {formatDate(pkg.purchaseDate)} | Expires: {formatDate(pkg.expiryDate)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="font-medium">Cost: </span>${pkg.cost}
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Features:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="text-sm">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="quota" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quota Usage</CardTitle>
                <CardDescription>Last updated: {getTimeAgo(operator.quotaUsage.lastUpdated)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        {operator.quotaUsage.used.toLocaleString()} / {operator.quotaUsage.total.toLocaleString()}
                      </span>
                      <span className="text-sm font-medium">{quotaPercentage}%</span>
                    </div>
                    <Progress value={quotaPercentage} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">Total Quota</div>
                      <div className="text-2xl font-bold">{operator.quotaUsage.total.toLocaleString()}</div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">Used</div>
                      <div className="text-2xl font-bold">{operator.quotaUsage.used.toLocaleString()}</div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">Remaining</div>
                      <div className="text-2xl font-bold">{operator.quotaUsage.remaining.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Account Status</h4>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={operator.status} />
                      <span className="text-sm">
                        {operator.status === "Active"
                          ? "Account is active and operational"
                          : operator.status === "Inactive"
                            ? "Account is currently inactive"
                            : operator.status === "Pending"
                              ? "Account is pending activation"
                              : "Account has been suspended"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${operator.settings.twoFactorEnabled ? "bg-green-500" : "bg-red-500"}`}
                      ></div>
                      <span className="text-sm">{operator.settings.twoFactorEnabled ? "Enabled" : "Disabled"}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Password</h4>
                    <div className="text-sm">Last changed: {getTimeAgo(operator.lastPasswordChange)}</div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Role & Permissions</h4>
                    <div className="text-sm">Role: {operator.role}</div>
                    <div className="text-sm">Custom permissions: {operator.customPermissions.length}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

