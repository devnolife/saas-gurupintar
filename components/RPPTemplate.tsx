"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

type InputType = "text" | "textarea" | "number" | "date" | "select" | "paragraph"

interface CustomField {
  id: string
  label: string
  type: InputType
  options?: string[] // For select inputs
  required: boolean
}

interface Section {
  id: string
  title: string
  fields: CustomField[]
}

export function CustomRPPTemplateForm() {
  const [templateName, setTemplateName] = useState("")
  const [grade, setGrade] = useState("")
  const [semester, setSemester] = useState("")
  const [sections, setSections] = useState<Section[]>([
    {
      id: "basic-info",
      title: "Basic Information",
      fields: [
        { id: "teacher-name", label: "Teacher Name", type: "text", required: true },
        { id: "subject", label: "Subject", type: "text", required: true },
      ],
    },
  ])

  // Add a new section
  const addSection = () => {
    const newSection: Section = {
      id: `section-${Date.now()}`,
      title: "New Section",
      fields: [],
    }
    setSections((prev) => [...prev, newSection])
  }

  // Update the title of a section
  const updateSectionTitle = (sectionId: string, newTitle: string) => {
    setSections((prev) =>
      prev.map((section) => (section.id === sectionId ? { ...section, title: newTitle } : section)),
    )
  }

  // Add a new field to a given section
  const addField = (sectionId: string) => {
    const newField: CustomField = {
      id: `field-${Date.now()}`,
      label: "New Field",
      type: "text",
      required: false,
    }
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, fields: [...section.fields, newField] } : section,
      ),
    )
  }

  // Update a field’s properties
  const updateField = (sectionId: string, fieldId: string, updates: Partial<CustomField>) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
            ...section,
            fields: section.fields.map((field) =>
              field.id === fieldId ? { ...field, ...updates } : field,
            ),
          }
          : section,
      ),
    )
  }

  // Remove a field from a given section
  const removeField = (sectionId: string, fieldId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, fields: section.fields.filter((field) => field.id !== fieldId) }
          : section,
      ),
    )
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Typically you'd send data to a backend or global state here
    console.log("Submitting template:", { templateName, grade, semester, sections })
    toast({
      title: "Template saved successfully",
      description: "Your custom RPP template has been saved and is now available for teachers to use.",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Template Basic Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Custom RPP Template</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="templateName">Template Name</Label>
            <Input
              id="templateName"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="grade">Grade</Label>
            <Input id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger>
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Semester 1</SelectItem>
                <SelectItem value="2">Semester 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Sections */}
      {sections.map((section) => (
        <Card key={section.id}>
          <CardHeader>
            <CardTitle>
              <Input
                value={section.title}
                onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                className="font-bold text-lg"
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {section.fields.map((field) => (
              <div key={field.id} className="space-y-2 border-b pb-4">
                <div className="flex items-center space-x-2">
                  {/* Field Label */}
                  <Input
                    value={field.label}
                    onChange={(e) => updateField(section.id, field.id, { label: e.target.value })}
                    className="flex-grow"
                  />

                  {/* Field Type Selection */}
                  <Select
                    value={field.type}
                    onValueChange={(value) =>
                      updateField(section.id, field.id, { type: value as InputType })
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select input type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="textarea">Textarea</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="select">Select</SelectItem>
                      <SelectItem value="paragraph">Paragraph</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Required Checkbox */}
                  <Checkbox
                    checked={field.required}
                    onCheckedChange={(checked) =>
                      updateField(section.id, field.id, { required: checked as boolean })
                    }
                  />
                  <Label htmlFor={`required-${field.id}`}>Required</Label>

                  {/* Remove Field Button */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeField(section.id, field.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* If 'select', show options input */}
                {field.type === "select" && (
                  <div className="pl-4">
                    <Label>Options (comma-separated)</Label>
                    <Input
                      value={field.options?.join(", ") || ""}
                      onChange={(e) =>
                        updateField(section.id, field.id, { options: e.target.value.split(", ") })
                      }
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Add Field Button */}
            <Button type="button" variant="outline" onClick={() => addField(section.id)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Field
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Add Section Button */}
      <Button type="button" onClick={addSection} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Section
      </Button>

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Save Template
      </Button>
    </form>
  )
}
