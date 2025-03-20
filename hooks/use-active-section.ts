"use client"

import { useState, useEffect } from "react"

export function useActiveSection(sections: string[], offset = 100) {
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    // Function to check which section is in view
    const checkSections = () => {
      // Get all sections
      const sectionElements = sections
        .map((section) => {
          // Remove the leading slash and hash if present (e.g., "/#features" -> "features")
          const sectionId = section.replace(/^\/?#/, "")
          return document.getElementById(sectionId)
        })
        .filter(Boolean) as HTMLElement[]

      // If we're at the top of the page, set the first section as active
      if (window.scrollY < 100) {
        setActiveSection(sections[0])
        return
      }

      // Find the section that is currently in view
      for (const element of sectionElements) {
        const rect = element.getBoundingClientRect()
        // Check if the section is in the viewport (with offset)
        if (rect.top <= offset && rect.bottom > offset) {
          // Find the corresponding section in our sections array
          const activeSection = sections.find((section) => section.endsWith(element.id))
          if (activeSection) {
            setActiveSection(activeSection)
            return
          }
        }
      }
    }

    // Set up intersection observers for each section
    sections.forEach((section) => {
      const sectionId = section.replace(/^\/?#/, "")
      const element = document.getElementById(sectionId)

      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // When a section enters the viewport, check all sections
              // This helps handle cases where multiple sections might be partially visible
              if (entry.isIntersecting) {
                checkSections()
              }
            })
          },
          {
            threshold: 0.2,
            rootMargin: `-${offset}px 0px -70% 0px`,
          },
        )

        observer.observe(element)
        observers.push(observer)
      }
    })

    // Also listen to scroll events for more responsive updates
    window.addEventListener("scroll", checkSections, { passive: true })

    // Initial check
    checkSections()

    return () => {
      // Clean up observers and event listeners
      observers.forEach((observer) => observer.disconnect())
      window.removeEventListener("scroll", checkSections)
    }
  }, [sections, offset])

  return activeSection
}

