"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { initializeMockDatabase } from "@/lib/api/mockDatabase"

// Context for the mock API
interface MockApiContextType {
  isInitialized: boolean
  resetDatabase: () => void
}

const MockApiContext = createContext<MockApiContextType>({
  isInitialized: false,
  resetDatabase: () => { },
})

// Provider component
export function MockApiProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize the mock database
  useEffect(() => {
    initializeMockDatabase()
    setIsInitialized(true)
  }, [])

  // Function to reset the database
  const resetDatabase = () => {
    initializeMockDatabase()
  }

  return <MockApiContext.Provider value={{ isInitialized, resetDatabase }}>{children}</MockApiContext.Provider>
}

// Hook to use the mock API context
export function useMockApi() {
  const context = useContext(MockApiContext)
  if (context === undefined) {
    throw new Error("useMockApi must be used within a MockApiProvider")
  }
  return context
}

