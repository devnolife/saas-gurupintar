import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, School, Settings, LogOut } from "lucide-react"
import Link from "next/link"

export function AdminSidebar() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/users">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/schools">
                <School className="mr-2 h-4 w-4" />
                Manage Schools
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <Button variant="outline" className="w-full">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

