"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useMockApi } from "@/providers/mock-api-provider"
import { TeachersListExample } from "@/components/examples/TeachersList"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function MockApiExamplePage() {
  const { isInitialized, resetDatabase } = useMockApi()
  const [resetMessage, setResetMessage] = useState<string | null>(null)

  // Handle reset database
  const handleResetDatabase = () => {
    resetDatabase()
    setResetMessage("Database reset successfully!")

    // Clear message after 3 seconds
    setTimeout(() => {
      setResetMessage(null)
    }, 3000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mock API Example</h1>

      {!isInitialized ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Mock API is not initialized yet. Please wait...</AlertDescription>
        </Alert>
      ) : (
        <>
          {resetMessage && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{resetMessage}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end mb-4">
            <Button onClick={handleResetDatabase}>Reset Mock Database</Button>
          </div>

          <Tabs defaultValue="teachers">
            <TabsList className="mb-4">
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="rpps">Lesson Plans</TabsTrigger>
            </TabsList>

            <TabsContent value="teachers">
              <TeachersListExample />
            </TabsContent>

            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle>Students List</CardTitle>
                  <CardDescription>
                    This tab would display a list of students using the mock API and Zustand store.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Students list component would go here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rpps">
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Plans</CardTitle>
                  <CardDescription>
                    This tab would display a list of lesson plans using the mock API and Zustand store.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Lesson plans list component would go here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}

