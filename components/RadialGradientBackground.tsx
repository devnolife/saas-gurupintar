"use client"

import type React from "react"

interface RadialGradientBackgroundProps {
  children: React.ReactNode
  className?: string
}

function RadialGradientBackground({ children, className = "" }: RadialGradientBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent opacity-70 z-0" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export { RadialGradientBackground }
export default RadialGradientBackground

