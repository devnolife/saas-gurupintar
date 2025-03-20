"use client"

import { useEffect, useState } from "react"

export default function RadialGradientBackground() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render anything on the server
  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent opacity-70" />
    </div>
  )
}

