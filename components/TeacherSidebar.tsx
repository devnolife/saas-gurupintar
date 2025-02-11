import { Button } from "@/components/ui/button"
import { LayoutDashboard, BookOpen, Calendar, Users, Settings, LogOut } from "lucide-react"
import Link from "next/link"

export function TeacherSidebar() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/teacher">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/teacher/lessons">
                <BookOpen className="mr-2 h-4 w-4" />
                Lessons
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/teacher/schedule">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/teacher/students">
                <Users className="mr-2 h-4 w-4" />
                Students
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/teacher/settings">
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

