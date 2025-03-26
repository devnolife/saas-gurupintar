"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Add a debug log to help identify issues
  useEffect(() => {
    if (mounted) {
      console.log("Current theme:", theme)
      console.log("Resolved theme:", resolvedTheme)
    }
  }, [theme, resolvedTheme, mounted])

  // Handle direct toggle without dropdown
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    // Return a placeholder with the same dimensions to avoid layout shift
    return (
      <Button
        variant="outline"
        size="icon"
        className="border-muted-foreground/20 bg-background/80 backdrop-blur-sm w-9 h-9"
        aria-label="Toggle theme"
      >
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-muted-foreground/20 dark:border-gray-700 bg-background/80 dark:bg-gray-800/80 backdrop-blur-sm relative z-10"
          onClick={(e) => {
            // Prevent the dropdown from opening on mobile for a direct toggle
            if (window.innerWidth < 768) {
              e.preventDefault()
              toggleTheme()
            }
          }}
          aria-label="Toggle theme"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground dark:text-white" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground dark:text-white" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-gray-900 border-border dark:border-gray-700 z-50">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="text-foreground dark:text-white hover:bg-muted dark:hover:bg-gray-800 cursor-pointer"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="text-foreground dark:text-white hover:bg-muted dark:hover:bg-gray-800 cursor-pointer"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="text-foreground dark:text-white hover:bg-muted dark:hover:bg-gray-800 cursor-pointer"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

