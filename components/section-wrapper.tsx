import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  id: string
  className?: string
  children: ReactNode
}

export function SectionWrapper({ id, className, children }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24 scroll-mt-20", className)}>
      <div className="container px-4 mx-auto">{children}</div>
    </section>
  )
}

