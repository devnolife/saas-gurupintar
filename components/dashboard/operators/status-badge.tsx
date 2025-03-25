import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: "Active" | "Inactive" | "Pending" | "Suspended" | string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  // Default to "default" variant if status is undefined
  if (!status) {
    return <Badge variant="outline">Unknown</Badge>
  }

  // Map status to variant
  const getVariant = () => {
    switch (status) {
      case "Active":
        return "success"
      case "Inactive":
        return "secondary"
      case "Pending":
        return "warning"
      case "Suspended":
        return "destructive"
      default:
        return "outline"
    }
  }

  return <Badge variant={getVariant() as any}>{status}</Badge>
}

