/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

// Simulated RPP generation function
const generateRPP = async (formData: any): Promise<any> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 3000))

  // Simulated RPP data
  return {
    title: `Rencana Pelaksanaan Pembelajaran: ${formData.subject}`,
    subject: formData.subject,
    grade: formData.grade,
    duration: formData.duration,
    learningObjectives: formData.learningObjectives.split("\n"),
    activities: [
      "Pendahuluan: Guru menjelaskan tujuan pembelajaran (10 menit)",
      "Kegiatan Inti: Siswa mengerjakan latihan soal (60 menit)",
      "Penutup: Guru dan siswa menyimpulkan pembelajaran (10 menit)",
    ],
    assessment: formData.assessment,
  }
}

export default function TeacherDashboardPage() {
  const [formData, setFormData] = useState({
    subject: "",
    grade: "",
    duration: "",
    learningObjectives: "",
    assessment: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedRPP, setGeneratedRPP] = useState<any>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    try {
      const rpp = await generateRPP(formData)
      setGeneratedRPP(rpp)
    } catch (error) {
      console.error("Error generating RPP:", error)
    }
    setIsGenerating(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Guru</h1>

      {/* 
        Menggunakan flex (atau grid) untuk meletakkan form dan hasil RPP berdampingan 
        di layar besar. Pada layar kecil, otomatis menumpuk (col).
      */}
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Kolom kiri: Form pembuatan RPP */}
        <Card className="md:w-1/2">
          <CardHeader>
            <CardTitle>Buat RPP Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Mata Pelajaran</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Kelas</Label>
                <Input
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Durasi</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="learningObjectives">Tujuan Pembelajaran</Label>
                <Textarea
                  id="learningObjectives"
                  name="learningObjectives"
                  value={formData.learningObjectives}
                  onChange={handleInputChange}
                  required
                  placeholder="Masukkan setiap tujuan pembelajaran pada baris baru"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assessment">Penilaian</Label>
                <Textarea
                  id="assessment"
                  name="assessment"
                  value={formData.assessment}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Button type="submit" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating RPP...
                  </>
                ) : (
                  "Generate RPP"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Kolom kanan: Hasil RPP (hanya tampil jika sudah di-generate) */}
        {generatedRPP && (
          <Card className="md:w-1/2">
            <CardHeader>
              <CardTitle>RPP yang Dihasilkan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">{generatedRPP.title}</h2>
                <p>
                  <strong>Mata Pelajaran:</strong> {generatedRPP.subject}
                </p>
                <p>
                  <strong>Kelas:</strong> {generatedRPP.grade}
                </p>
                <p>
                  <strong>Durasi:</strong> {generatedRPP.duration}
                </p>
                <div>
                  <h3 className="font-semibold">Tujuan Pembelajaran:</h3>
                  <ul className="list-disc pl-5">
                    {generatedRPP.learningObjectives.map(
                      (objective: string, index: number) => (
                        <li key={index}>{objective}</li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Kegiatan Pembelajaran:</h3>
                  <ol className="list-decimal pl-5">
                    {generatedRPP.activities.map(
                      (activity: string, index: number) => (
                        <li key={index}>{activity}</li>
                      )
                    )}
                  </ol>
                </div>
                <p>
                  <strong>Penilaian:</strong> {generatedRPP.assessment}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
