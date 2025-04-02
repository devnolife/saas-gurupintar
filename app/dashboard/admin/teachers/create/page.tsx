"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AddTeacherForm } from "@/components/teachers/AddTeacherForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { z } from "zod"

// Define the type based on the schema from AddTeacherForm
type TeacherFormData = {
  fullName: string
  email: string
  password: string
  phone: string
  address: string
  bio?: string
  subjects: string
  education: string
  experience?: string
  [key: string]: any // Allow other properties from the form
}

export default function CreateTeacherPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreateTeacher = async (data: TeacherFormData) => {
    setIsSubmitting(true)
    
    try {
      // Prepare the data for the API
      const teacherData = {
        name: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
        bio: data.bio,
        // Teacher-specific fields
        subject: data.subjects,
        qualification: data.education,
        experience: data.experience,
        // Avatar will be added later in a real implementation
      }

      // Call the API to create the teacher
      const response = await fetch('/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacherData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create teacher')
      }

      toast({
        title: "Success",
        description: "Teacher account created successfully",
      })

      // Navigate back to teachers list
      router.push("/dashboard/admin/teachers")
      router.refresh()
    } catch (error: unknown) {
      console.error("Error creating teacher:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create teacher account",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create Teacher Account</h1>
          <p className="text-muted-foreground">
            Add a new teacher to the system with appropriate details and permissions
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teacher Information</CardTitle>
          <CardDescription>
            Fill in the teacher's information to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitting ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-lg">Creating teacher account...</span>
            </div>
          ) : (
            <AddTeacherForm onSubmit={handleCreateTeacher} isSubmitting={isSubmitting} />
          )}
        </CardContent>
      </Card>
    </div>
  )
} 