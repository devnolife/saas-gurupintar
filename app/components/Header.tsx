import Link from "next/link"

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Guru Pintar
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="#benefits" className="text-gray-600 hover:text-blue-600">
                Manfaat
              </Link>
            </li>
            <li>
              <Link href="#features" className="text-gray-600 hover:text-blue-600">
                Fitur
              </Link>
            </li>
            <li>
              <Link href="#testimonials" className="text-gray-600 hover:text-blue-600">
                Testimoni
              </Link>
            </li>
            <li>
              <Link href="#faq" className="text-gray-600 hover:text-blue-600">
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

