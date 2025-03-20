"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"
import { type SchoolActivity, getActivitiesByStatus, getSchoolActivities } from "@/app/data/schoolActivities"
import { ActivityDetails } from "./ActivityDetails"

export function SchoolActivitiesSummary() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedActivity, setSelectedActivity] = useState<SchoolActivity | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const allActivities = getSchoolActivities()
  const upcomingActivities = getActivitiesByStatus("upcoming")
  const ongoingActivities = getActivitiesByStatus("ongoing")
  const completedActivities = getActivitiesByStatus("completed")

  const getActivitiesByTab = () => {
    switch (activeTab) {
      case "upcoming":
        return upcomingActivities
      case "ongoing":
        return ongoingActivities
      case "completed":
        return completedActivities
      default:
        return allActivities
    }
  }

  const handleViewActivity = (activity: SchoolActivity) => {
    setSelectedActivity(activity)
    setIsDialogOpen(true)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "upcoming":
        return "outline"
      case "ongoing":
        return "default"
      case "completed":
        return "success"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "academic":
        return "default"
      case "extracurricular":
        return "secondary"
      case "administrative":
        return "outline"
      case "holiday":
        return "success"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>School Activities</CardTitle>
        <CardDescription>Summary of school events and activities</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getActivitiesByTab().map((activity) => (
                <Card key={activity.id} className="overflow-hidden">
                  {activity.media && activity.media.length > 0 && activity.media[0].type === "image" && (
                    <div className="relative h-40 w-full">
                      <img
                        src={activity.media[0].url || "/placeholder.svg"}
                        alt={activity.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{activity.name}</h3>
                      <Badge variant={getStatusBadgeVariant(activity.status) as any}>
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(activity.date).toLocaleDateString()}
                        {activity.endDate && ` - ${new Date(activity.endDate).toLocaleDateString()}`}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{activity.location}</span>
                    </div>

                    <p className="text-sm mb-3 line-clamp-2">{activity.description}</p>

                    <div className="flex justify-between items-center">
                      <Badge variant={getTypeBadgeVariant(activity.type) as any}>
                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                      </Badge>

                      <Button variant="outline" size="sm" onClick={() => handleViewActivity(activity)}>
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {getActivitiesByTab().length === 0 && (
                <div className="col-span-2 flex flex-col items-center justify-center py-8 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No activities found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    There are no {activeTab !== "all" ? activeTab : ""} activities to display.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Activity Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Activity Details</DialogTitle>
              <DialogDescription>Complete information about the selected activity.</DialogDescription>
            </DialogHeader>
            {selectedActivity && <ActivityDetails activity={selectedActivity} onClose={() => setIsDialogOpen(false)} />}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

