import { OperatorLayout } from "@/components/OperatorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OperatorDashboard() {
  return (
    <OperatorLayout>
      <h1 className="text-3xl font-bold mb-6">Operator Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">87</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">42</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12</p>
          </CardContent>
        </Card>
      </div>
    </OperatorLayout>
  )
}

