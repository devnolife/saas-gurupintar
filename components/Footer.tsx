import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ArrowRight, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 dark:from-gray-950 dark:to-gray-900 border-t border-border/40 dark:border-gray-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: About & Newsletter */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-xl bg-primary opacity-20 dark:opacity-40 blur-xl"></div>
                <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground">
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
                  <ArrowRight className="h-4 w-4" />
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
                      className="text-muted-foreground dark:text-gray-300 hover:text-foreground dark:hover:text-white transition-colors duration-200"
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
                    className="text-muted-foreground dark:text-gray-300 hover:text-foreground dark:hover:text-white transition-colors duration-200"
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
                <Mail className="h-4 w-4 text-primary" />
                <span>support@gurupintar.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground dark:text-gray-300">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground dark:text-gray-300">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Jakarta, Indonesia</span>
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
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-muted dark:bg-gray-800 text-muted-foreground dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary transition-colors duration-200"
                  >
                    <social.icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/40 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground dark:text-gray-400 order-2 md:order-1">
              © {currentYear} Guru Pintar. All rights reserved.
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground dark:text-gray-400 order-1 md:order-2">
              <span>Created with</span>
              <Heart className="h-3 w-3 text-destructive fill-destructive animate-pulse-slow" />
              <span>by</span>
              <Link
                href="https://github.com/devnolife"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
              >
                devnolife
              </Link>
            </div>

            <div className="flex gap-6 order-3 md:order-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-xs text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors duration-200"
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

