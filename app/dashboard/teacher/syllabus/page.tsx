"use client"

import type React from "react"

import { useState, type ChangeEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, BookOpen, Save, FileText, Clock, Users, Sparkles } from "lucide-react"

interface SyllabusFormData {
  subject: string
  grade: string
  semester: string
  academicYear: string
  coreCompetencies: string
  basicCompetencies: string
  indicators: string
  mainTopics: string
  learningActivities: string
  assessmentMethods: string
  timeAllocation: string
  learningResources: string
}

export default function SyllabusPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("form")
  const [formData, setFormData] = useState<SyllabusFormData>({
    subject: "",
    grade: "",
    semester: "",
    academicYear: "",
    coreCompetencies: "",
    basicCompetencies: "",
    indicators: "",
    mainTopics: "",
    learningActivities: "",
    assessmentMethods: "",
    timeAllocation: "",
    learningResources: "",
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    setActiveTab("preview")
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            Create Syllabus
          </h1>
          <p className="text-muted-foreground mt-1">Design a comprehensive syllabus for your class</p>
        </div>
        <Button className="gap-2">
          <Sparkles className="h-4 w-4" />
          Generate with AI
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="form" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Create Syllabus
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="mt-0">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                New Syllabus
              </CardTitle>
              <CardDescription>Fill in the details to create a comprehensive syllabus</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section 1: Basic Information */}
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="border-primary/20 focus-visible:ring-primary/30"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade</Label>
                      <Select value={formData.grade} onValueChange={(value) => handleSelectChange(value, "grade")}>
                        <SelectTrigger className="border-primary/20 focus-visible:ring-primary/30">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map((grade) => (
                            <SelectItem key={grade} value={grade.toString()}>
                              Grade {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Select
                        value={formData.semester}
                        onValueChange={(value) => handleSelectChange(value, "semester")}
                      >
                        <SelectTrigger className="border-primary/20 focus-visible:ring-primary/30">
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Semester 1</SelectItem>
                          <SelectItem value="2">Semester 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="academicYear">Academic Year</Label>
                      <Input
                        id="academicYear"
                        name="academicYear"
                        value={formData.academicYear}
                        onChange={handleInputChange}
                        placeholder="2024/2025"
                        className="border-primary/20 focus-visible:ring-primary/30"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Competencies */}
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Competencies
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="coreCompetencies">Core Competencies (KI)</Label>
                      <Textarea
                        id="coreCompetencies"
                        name="coreCompetencies"
                        value={formData.coreCompetencies}
                        onChange={handleInputChange}
                        placeholder="Develop students' critical and creative thinking abilities."
                        className="min-h-[100px] border-primary/20 focus-visible:ring-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="basicCompetencies">Basic Competencies (KD)</Label>
                      <Textarea
                        id="basicCompetencies"
                        name="basicCompetencies"
                        value={formData.basicCompetencies}
                        onChange={handleInputChange}
                        placeholder="Understand basic concepts of multiplication and division."
                        className="min-h-[100px] border-primary/20 focus-visible:ring-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="indicators">Competency Achievement Indicators</Label>
                      <Textarea
                        id="indicators"
                        name="indicators"
                        value={formData.indicators}
                        onChange={handleInputChange}
                        placeholder="Students can accurately solve simple multiplication problems."
                        className="min-h-[100px] border-primary/20 focus-visible:ring-primary/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Content & Activities */}
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Content & Learning
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mainTopics">Main Topics</Label>
                      <Textarea
                        id="mainTopics"
                        name="mainTopics"
                        value={formData.mainTopics}
                        onChange={handleInputChange}
                        className="min-h-[100px] border-primary/20 focus-visible:ring-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="learningActivities">Learning Activities</Label>
                      <Textarea
                        id="learningActivities"
                        name="learningActivities"
                        value={formData.learningActivities}
                        onChange={handleInputChange}
                        className="min-h-[100px] border-primary/20 focus-visible:ring-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assessmentMethods">Assessment Methods</Label>
                      <Textarea
                        id="assessmentMethods"
                        name="assessmentMethods"
                        value={formData.assessmentMethods}
                        onChange={handleInputChange}
                        className="min-h-[100px] border-primary/20 focus-visible:ring-primary/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Additional Information */}
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Additional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="timeAllocation">Time Allocation</Label>
                      <Input
                        id="timeAllocation"
                        name="timeAllocation"
                        value={formData.timeAllocation}
                        onChange={handleInputChange}
                        placeholder="2 × 35 minutes"
                        className="border-primary/20 focus-visible:ring-primary/30"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="learningResources">Learning Resources</Label>
                      <Textarea
                        id="learningResources"
                        name="learningResources"
                        value={formData.learningResources}
                        onChange={handleInputChange}
                        placeholder="Elementary Math textbook, interactive learning media, teaching aids."
                        className="min-h-[100px] border-primary/20 focus-visible:ring-primary/30"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="gap-2" disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Syllabus...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Generate Syllabus
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Syllabus Preview
              </CardTitle>
              <CardDescription>Review your generated syllabus before saving</CardDescription>
            </CardHeader>
            <CardContent>
              {formData.subject ? (
                <div className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Subject:</p>
                        <p className="text-sm">{formData.subject}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Grade:</p>
                        <p className="text-sm">{formData.grade}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Semester:</p>
                        <p className="text-sm">{formData.semester === "1" ? "Semester 1" : "Semester 2"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Academic Year:</p>
                        <p className="text-sm">{formData.academicYear}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Competencies</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Core Competencies (KI):</p>
                        <p className="text-sm">{formData.coreCompetencies || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Basic Competencies (KD):</p>
                        <p className="text-sm">{formData.basicCompetencies || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Competency Achievement Indicators:</p>
                        <p className="text-sm">{formData.indicators || "Not specified"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Content & Learning</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Main Topics:</p>
                        <p className="text-sm">{formData.mainTopics || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Learning Activities:</p>
                        <p className="text-sm">{formData.learningActivities || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Assessment Methods:</p>
                        <p className="text-sm">{formData.assessmentMethods || "Not specified"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Time Allocation:</p>
                        <p className="text-sm">{formData.timeAllocation || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Learning Resources:</p>
                        <p className="text-sm">{formData.learningResources || "Not specified"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No syllabus data to preview. Please fill out the form first.
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-4 border-t p-6">
              <Button variant="outline" onClick={() => setActiveTab("form")}>
                Edit Syllabus
              </Button>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Syllabus
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

