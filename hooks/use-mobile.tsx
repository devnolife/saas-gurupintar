"use client"

import { useState, useEffect } from "react"

/**
 * Custom hook to detect if a media query matches
 * @param query The media query to check
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    // Create a media query list
    const mediaQuery = window.matchMedia(query)

    // Set the initial value
    setMatches(mediaQuery.matches)

    // Define a callback function to handle changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add the event listener
    mediaQuery.addEventListener("change", handleChange)

    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

/**
 * Custom hook to detect if the device is mobile
 * @returns Boolean indicating if the device is mobile
 */
export function useMobile(): boolean {
  return useMediaQuery("(max-width: 768px)")
}

// For backwards compatibility, export useMobile as useIsMobile as well
export const useIsMobile = useMobile

export default useMobile

