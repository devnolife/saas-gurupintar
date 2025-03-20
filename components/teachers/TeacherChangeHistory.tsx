import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User } from "lucide-react"

export function TeacherChangeHistory({ history }) {
  // Sort history by date (newest first)
  const sortedHistory = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="space-y-4">
      {sortedHistory.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No changes recorded yet</p>
      ) : (
        sortedHistory.map((entry) => (
          <Card key={entry.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-muted p-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{entry.user}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{formatDate(entry.date)}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium mb-2">Changes:</h3>
                <div className="space-y-2">
                  {entry.changes.map((change, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2 text-sm">
                      <div className="font-medium">{change.field}</div>
                      <div className="flex items-center">
                        <span className="line-through text-muted-foreground">{change.oldValue}</span>
                      </div>
                      <div className="flex items-center">
                        <Badge variant="outline" className="font-normal">
                          {change.newValue}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}

