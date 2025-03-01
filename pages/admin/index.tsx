import AdminLayout from "@/components/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1,234</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Schools</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">56</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">789</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

