"use client"

import { ThemeToggle } from "@/components/ThemeToggle"
import { ThemeDebug } from "@/components/ThemeDebug"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeTestPage() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="container mx-auto py-20 px-4">
        <h1 className="text-3xl font-bold mb-8">Theme Toggle Test Page</h1>

        <div className="mb-8">
          <p className="mb-4">Current theme: {mounted ? resolvedTheme : "loading..."}</p>
          <div className="flex items-center gap-4">
            <span>Theme toggle:</span>
            <ThemeToggle />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Light/Dark Mode Test</h2>
            <p className="mb-4">This box should change color based on the theme.</p>
            <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
              Theme-responsive element
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Button Test</h2>
            <p className="mb-4">Try clicking these buttons to change the theme directly:</p>
            <div className="flex gap-3">
              <button
                onClick={() => document.documentElement.classList.remove("dark")}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Force Light
              </button>
              <button
                onClick={() => document.documentElement.classList.add("dark")}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Force Dark
              </button>
            </div>
          </div>
        </div>
      </div>

      <ThemeDebug />
    </div>
  )
}

