"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, BookOpen, Save, FileText, Clock, Users, Sparkles } from "lucide-react"

export function TeacherRPPGenerator({ teacherId, teacherName }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("form")
  const [formData, setFormData] = useState({
    subject: "",
    grade: "",
    topic: "",
    semester: "",
    academicYear: "",
    coreCompetencies: "",
    basicCompetencies: "",
    indicators: "",
    learningObjectives: "",
    learningMaterials: "",
    learningMethods: "",
    learningActivities: "",
    assessmentMethods: "",
    timeAllocation: "",
    learningResources: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value, field) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerateRPP = async () => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    setActiveTab("preview")
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="form" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Create RPP
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
                <FileText className="h-5 w-5 text-primary" />
                New Lesson Plan (RPP)
              </CardTitle>
              <CardDescription>
                Fill in the details to create a comprehensive lesson plan for {teacherName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
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
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
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
                    <div className="space-y-2">
                      <Label htmlFor="learningObjectives">Learning Objectives</Label>
                      <Textarea
                        id="learningObjectives"
                        name="learningObjectives"
                        value={formData.learningObjectives}
                        onChange={handleInputChange}
                        placeholder="By the end of this lesson, students will be able to..."
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
                      <Label htmlFor="topic">Topic</Label>
                      <Input
                        id="topic"
                        name="topic"
                        value={formData.topic}
                        onChange={handleInputChange}
                        placeholder="Main topic of the lesson"
                        className="border-primary/20 focus-visible:ring-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="learningMaterials">Learning Materials</Label>
                      <Textarea
                        id="learningMaterials"
                        name="learningMaterials"
                        value={formData.learningMaterials}
                        onChange={handleInputChange}
                        placeholder="Textbooks, worksheets, visual aids, etc."
                        className="min-h-[100px] border-primary/20 focus-visible:ring-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="learningMethods">Learning Methods</Label>
                      <Textarea
                        id="learningMethods"
                        name="learningMethods"
                        value={formData.learningMethods}
                        onChange={handleInputChange}
                        placeholder="Discussion, demonstration, group work, etc."
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
                        placeholder="Detailed sequence of learning activities"
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
                        placeholder="Quizzes, observations, assignments, etc."
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
                        placeholder="Textbooks, websites, teaching aids, etc."
                        className="min-h-[100px] border-primary/20 focus-visible:ring-primary/30"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save Draft</Button>
              <Button onClick={handleGenerateRPP} disabled={isGenerating} className="gap-2">
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate RPP
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                RPP Preview
              </CardTitle>
              <CardDescription>Review your generated lesson plan before saving</CardDescription>
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
                      <div>
                        <p className="text-sm font-medium">Topic:</p>
                        <p className="text-sm">{formData.topic}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Time Allocation:</p>
                        <p className="text-sm">{formData.timeAllocation}</p>
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
                      <div>
                        <p className="text-sm font-medium">Learning Objectives:</p>
                        <p className="text-sm">{formData.learningObjectives || "Not specified"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Learning Content & Activities</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Learning Materials:</p>
                        <p className="text-sm">{formData.learningMaterials || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Learning Methods:</p>
                        <p className="text-sm">{formData.learningMethods || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Learning Activities:</p>
                        <p className="text-sm">{formData.learningActivities || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Assessment Methods:</p>
                        <p className="text-sm">{formData.assessmentMethods || "Not specified"}</p>
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
                  No RPP data to preview. Please fill out the form first.
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-4 border-t p-6">
              <Button variant="outline" onClick={() => setActiveTab("form")}>
                Edit RPP
              </Button>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save RPP
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

