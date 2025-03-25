import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PackageBadge } from "./package-badge"
import { Check } from "lucide-react"

interface Package {
  id: string
  name: string
  tier: "Basic" | "Standard" | "Premium" | "Enterprise"
  features: string[]
  cost: number
  purchaseDate: string
  expiryDate: string
  status?: "Active" | "Expired"
}

interface PackageCardProps {
  package: Package
}

export function PackageCard({ package: pkg }: PackageCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString()
    } catch (e) {
      return "Invalid date"
    }
  }

  const isExpired = pkg.status === "Expired" || new Date(pkg.expiryDate) < new Date()

  return (
    <Card className={isExpired ? "opacity-70" : ""}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{pkg.name}</CardTitle>
          <div className="flex items-center gap-2">
            <PackageBadge tier={pkg.tier} />
            {isExpired && <span className="text-xs font-medium text-destructive">Expired</span>}
          </div>
        </div>
        <CardDescription>
          Purchased: {formatDate(pkg.purchaseDate)} | Expires: {formatDate(pkg.expiryDate)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="font-medium">Cost: </span>
          <span className="text-lg font-bold">${pkg.cost}</span>
          {pkg.billingCycle && (
            <span className="text-sm text-muted-foreground ml-1">
              / {pkg.billingCycle === "Monthly" ? "month" : "year"}
            </span>
          )}
        </div>

        <div>
          <h4 className="font-medium mb-2">Features:</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {pkg.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

