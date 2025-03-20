"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, FileText, Download, User, FileType } from "lucide-react"
import type { SchoolActivity } from "@/app/data/schoolActivities"

interface ActivityDetailsProps {
  activity: SchoolActivity
  onClose: () => void
}

export function ActivityDetails({ activity, onClose }: ActivityDetailsProps) {
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
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">{activity.name}</h2>
        <Badge variant={getStatusBadgeVariant(activity.status) as any}>
          {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <div>
            <span className="font-medium">Date: </span>
            <span>
              {new Date(activity.date).toLocaleDateString()}
              {activity.endDate && ` - ${new Date(activity.endDate).toLocaleDateString()}`}
            </span>
          </div>
        </div>

        <div className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
          <div>
            <span className="font-medium">Location: </span>
            <span>{activity.location}</span>
          </div>
        </div>

        <div className="flex items-center text-sm">
          <User className="h-4 w-4 mr-2 text-muted-foreground" />
          <div>
            <span className="font-medium">Organizer: </span>
            <span>{activity.organizer}</span>
          </div>
        </div>

        <div className="flex items-center text-sm">
          <FileType className="h-4 w-4 mr-2 text-muted-foreground" />
          <div>
            <span className="font-medium">Type: </span>
            <Badge variant={getTypeBadgeVariant(activity.type) as any}>
              {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-1">Description</h3>
        <p className="text-sm">{activity.description}</p>
      </div>

      {activity.participants && activity.participants.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-1">Participants</h3>
          <div className="flex flex-wrap gap-2">
            {activity.participants.map((participant, index) => (
              <Badge key={index} variant="outline">
                <Users className="h-3 w-3 mr-1" />
                {participant}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {activity.media && activity.media.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Media</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {activity.media.map((item, index) =>
              item.type === "image" ? (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                  <img
                    src={item.url || "/placeholder.svg"}
                    alt={`Activity media ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div key={index} className="flex items-center p-2 rounded-md bg-muted">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm truncate">Document {index + 1}</span>
                </div>
              ),
            )}
          </div>
        </div>
      )}

      {activity.attachments && activity.attachments.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Attachments</h3>
          <div className="space-y-2">
            {activity.attachments.map((attachment, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{attachment}</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end mt-6">
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  )
}

