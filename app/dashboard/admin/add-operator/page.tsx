"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function AddOperatorPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    role: "operator",
    teacherAccounts: 0,
  })
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, school: value }))
  }

  const handleTeacherAccountsChange = (value: string) => {
    setFormData((prev) => ({ ...prev, teacherAccounts: Number.parseInt(value, 10) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log("Submitting operator data:", formData)

    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Operator Added",
      description: `The new operator has been successfully added to the system with ${formData.teacherAccounts} teacher accounts.`,
    })

    router.push("/dashboard/admin/users")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Operator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Operator Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter operator's full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter operator's email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school">Assigned School</Label>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a school" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="school1">School 1</SelectItem>
                  <SelectItem value="school2">School 2</SelectItem>
                  <SelectItem value="school3">School 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacherAccounts">Number of Teacher Accounts</Label>
              <Select onValueChange={handleTeacherAccountsChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select number of teacher accounts" />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 15, 20, 25, 30].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                The operator will not be able to log in if no teacher accounts are available. Please ensure you allocate
                the appropriate number of teacher accounts.
              </AlertDescription>
            </Alert>
            <Button type="submit" className="w-full">
              Add Operator
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

