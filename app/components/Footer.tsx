import Link from "next/link"
import { Facebook, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold">
              Guru Pintar
            </Link>
          </div>
          <nav className="mb-4 md:mb-0">
            <ul className="flex space-x-4">
              <li>
                <Link href="/about" className="hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-blue-400">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-400">
              <Facebook />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-400">
              <Instagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-400">
              <Linkedin />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>Email: info@gurupintar.com | Phone: +62 123 456 7890</p>
          <p>Jl. Pendidikan No. 123, Jakarta, Indonesia</p>
          <p>&copy; 2025 Guru Pintar. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

