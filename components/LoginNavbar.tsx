import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LoginNavbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">Guru Pintar</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Button variant="outline" className="mr-2">
              Masuk sebagai Admin
            </Button>
            <Button>Masuk sebagai Guru</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

