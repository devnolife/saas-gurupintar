import type React from "react"

interface BaseLayoutProps {
  sidebar: React.ReactNode
  children: React.ReactNode
}

export function BaseLayout({ sidebar, children }: BaseLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 h-screen overflow-y-auto border-r border-gray-200">
        {sidebar}
      </div>
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        {children}
      </main>
    </div>
  )
}

