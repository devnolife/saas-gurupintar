import { TeacherSidebar } from "@/components/TeacherSidebar"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen overflow-hidden">
      <aside className="border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <TeacherSidebar />
      </aside>
      <main className="flex flex-col overflow-auto">
        <div className="flex-1 space-y-4 p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
} 