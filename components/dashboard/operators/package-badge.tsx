import { Badge } from "@/components/ui/badge"

interface PackageBadgeProps {
  tier: "Basic" | "Standard" | "Premium" | "Enterprise" | string
}

export function PackageBadge({ tier }: PackageBadgeProps) {
  // Default to "default" variant if tier is undefined
  if (!tier) {
    return <Badge variant="outline">Unknown</Badge>
  }

  // Map tier to variant and color
  const getVariant = () => {
    switch (tier) {
      case "Basic":
        return "outline"
      case "Standard":
        return "secondary"
      case "Premium":
        return "default"
      case "Enterprise":
        return "success"
      default:
        return "outline"
    }
  }

  return <Badge variant={getVariant() as any}>{tier}</Badge>
}

