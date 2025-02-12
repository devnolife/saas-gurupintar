"use client"

import { useState, type ChangeEvent } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"

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
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Buat Silabus Baru</h1>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 py-6">
            {/* Section 1: Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Informasi Dasar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">Mata Pelajaran</Label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Kelas</Label>
                  <Select value={formData.grade} onValueChange={(value) => handleSelectChange(value, "grade")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((grade) => (
                        <SelectItem key={grade} value={grade.toString()}>
                          Kelas {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select value={formData.semester} onValueChange={(value) => handleSelectChange(value, "semester")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Semester 1</SelectItem>
                      <SelectItem value="2">Semester 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Tahun Ajaran</Label>
                  <Input
                    id="academicYear"
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                    placeholder="2024/2025"
                    required
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 2: Competencies */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Kompetensi</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="coreCompetencies">Kompetensi Inti (KI)</Label>
                  <Textarea
                    id="coreCompetencies"
                    name="coreCompetencies"
                    value={formData.coreCompetencies}
                    onChange={handleInputChange}
                    placeholder="Mengembangkan kemampuan berpikir kritis dan kreatif siswa."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="basicCompetencies">Kompetensi Dasar (KD)</Label>
                  <Textarea
                    id="basicCompetencies"
                    name="basicCompetencies"
                    value={formData.basicCompetencies}
                    onChange={handleInputChange}
                    placeholder="Memahami konsep dasar perkalian dan pembagian."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="indicators">Indikator Pencapaian Kompetensi</Label>
                  <Textarea
                    id="indicators"
                    name="indicators"
                    value={formData.indicators}
                    onChange={handleInputChange}
                    placeholder="Siswa dapat menyelesaikan soal perkalian sederhana dengan tepat."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 3: Content & Activities */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Materi & Pembelajaran</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mainTopics">Materi Pokok</Label>
                  <Textarea
                    id="mainTopics"
                    name="mainTopics"
                    value={formData.mainTopics}
                    onChange={handleInputChange}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="learningActivities">Kegiatan Pembelajaran</Label>
                  <Textarea
                    id="learningActivities"
                    name="learningActivities"
                    value={formData.learningActivities}
                    onChange={handleInputChange}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assessmentMethods">Metode Penilaian</Label>
                  <Textarea
                    id="assessmentMethods"
                    name="assessmentMethods"
                    value={formData.assessmentMethods}
                    onChange={handleInputChange}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 4: Additional Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Informasi Tambahan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timeAllocation">Alokasi Waktu</Label>
                  <Input
                    id="timeAllocation"
                    name="timeAllocation"
                    value={formData.timeAllocation}
                    onChange={handleInputChange}
                    placeholder="2 × 35 menit"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="learningResources">Sumber Belajar</Label>
                  <Textarea
                    id="learningResources"
                    name="learningResources"
                    value={formData.learningResources}
                    onChange={handleInputChange}
                    placeholder="Buku Matematika SD, media pembelajaran interaktif, alat peraga."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Syllabus...
                </>
              ) : (
                "Generate Syllabus"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

