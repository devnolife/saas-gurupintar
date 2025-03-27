import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ArrowRight, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-gradient-to-b from-background to-muted/30 dark:from-gray-950 dark:to-gray-900 border-border/40 dark:border-gray-800">
      {/* Main Footer Content */}
      <div className="container px-4 py-12 mx-auto md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: About & Newsletter */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-xl bg-primary opacity-20 dark:opacity-40 blur-xl"></div>
                <div className="relative flex items-center justify-center w-full h-full font-bold rounded-xl bg-primary text-primary-foreground">
                  GP
                </div>
              </div>
              <h3 className="ml-3 text-xl font-bold text-foreground dark:text-white">Guru Pintar</h3>
            </div>

            <p className="text-muted-foreground dark:text-gray-300">
              Empowering educators with intelligent tools to create exceptional learning experiences.
            </p>

            <div className="space-y-3">
              <h4 className="font-medium text-foreground dark:text-white">Subscribe to our newsletter</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-400"
                />
                <Button size="icon" className="dark:bg-primary dark:text-white dark:hover:bg-primary/90">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">
                Get the latest updates and resources directly to your inbox.
              </p>
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground dark:text-white">Products</h4>
            <ul className="space-y-3">
              {["Lesson Planner", "Syllabus Builder", "Assessment Tools", "Resource Library", "Student Analytics"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="transition-colors duration-200 text-muted-foreground dark:text-gray-300 hover:text-foreground dark:hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground dark:text-white">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Careers", "Blog", "Press", "Partners", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="transition-colors duration-200 text-muted-foreground dark:text-gray-300 hover:text-foreground dark:hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground dark:text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground dark:text-gray-300">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@gurupintar.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground dark:text-gray-300">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground dark:text-gray-300">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Makassar, Indonesia</span>
              </li>
            </ul>

            <div className="space-y-3">
              <h4 className="font-medium text-foreground dark:text-white">Follow us</h4>
              <div className="flex gap-4">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Youtube, label: "YouTube" },
                ].map((social) => (
                  <Link
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="flex items-center justify-center transition-colors duration-200 rounded-full h-9 w-9 bg-muted dark:bg-gray-800 text-muted-foreground dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary"
                  >
                    <social.icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/40 dark:border-gray-800">
        <div className="container px-4 py-6 mx-auto">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
            <div className="w-full text-sm text-muted-foreground dark:text-gray-400">
              © {currentYear} Guru Pintar. All rights reserved.
            </div>

            <div className="flex items-center justify-center w-full gap-1 text-sm text-muted-foreground dark:text-gray-400">
              <span>Created with</span>
              <Heart className="w-3 h-3 text-destructive fill-destructive animate-pulse-slow" />
              <span>by</span>
              <Link
                href="https://github.com/devnolife"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition-colors hover:text-primary dark:text-gray-300 dark:hover:text-primary"
              >
                devnolife & dhf.ai
              </Link>
            </div>

            <div className="flex justify-center w-full gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-xs transition-colors duration-200 text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

