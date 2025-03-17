"use client"

import { useState, type ChangeEvent, type React } from "react"
import { RPPForm } from "@/components/RPPForm"
import { RPPPreview } from "@/components/RPPPreview"
import { FAKE_RPP_DATA } from "@/app/data/fakeRPPData"

// Function to generate RPP
const generateRPP = async (formData: any): Promise<any> => {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  let matched = FAKE_RPP_DATA.find(
    (rpp) => rpp.subject.toLowerCase() === formData.subject.toLowerCase() && rpp.grade === formData.grade,
  )

  if (!matched) {
    matched = FAKE_RPP_DATA[Math.floor(Math.random() * FAKE_RPP_DATA.length)]
  }

  return {
    ...matched,
    title: `RPP : ${formData.subject} untuk Kelas ${formData.grade}`,
    subject: formData.subject || matched.subject,
    grade: formData.grade || matched.grade,
    duration: formData.duration || matched.duration,
    identitasModule: formData.identitasModule || matched.identitasModule,
    kompetensiAwal: formData.kompetensiAwal || matched.kompetensiAwal,
    profilPelajarPancasila: formData.profilPelajarPancasila || matched.profilPelajarPancasila,
    saranaPrasarana: formData.saranaPrasarana || matched.saranaPrasarana,
    targetPesertaDidik: formData.targetPesertaDidik || matched.targetPesertaDidik,
    modelPembelajaran: formData.modelPembelajaran || matched.modelPembelajaran,
    learningObjectives: formData.learningObjectives
      ? formData.learningObjectives.split("\n")
      : matched.learningObjectives,
    assessment: formData.assessment || matched.assessment,
    refleksiGuru: formData.refleksiGuru || matched.refleksiGuru,
    refleksiPesertaDidik: formData.refleksiPesertaDidik || matched.refleksiPesertaDidik,
    pengayaanRemedial: formData.pengayaanRemedial || matched.pengayaanRemedial,
    bahanBacaan: formData.bahanBacaan || matched.bahanBacaan,
    glosarium: formData.glosarium || matched.glosarium,
  }
}

export default function TeacherDashboardPage() {
  const [formData, setFormData] = useState({
    subject: "",
    grade: "",
    duration: "",
    identitasModule: "",
    kompetensiAwal: "",
    profilPelajarPancasila: "",
    saranaPrasarana: "",
    targetPesertaDidik: "",
    modelPembelajaran: "",
    learningObjectives: "",
    assessment: "",
    refleksiGuru: "",
    refleksiPesertaDidik: "",
    pengayaanRemedial: "",
    bahanBacaan: "",
    glosarium: "",
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedRPP, setGeneratedRPP] = useState<any>(null)

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
    try {
      const rpp = await generateRPP(formData)
      setGeneratedRPP(rpp)
    } catch (error) {
      console.error("Error generating RPP:", error)
    }
    setIsGenerating(false)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
      <div className="w-full">
        <h2 className="text-2xl font-semibold mb-4">Create New Lesson Plan</h2>
        <RPPForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleSubmit={handleSubmit}
          isGenerating={isGenerating}
        />
      </div>
      {generatedRPP && (
        <div className="w-full mt-6">
          <h2 className="text-2xl font-semibold mb-4">Preview</h2>
          <RPPPreview generatedRPP={generatedRPP} isGenerating={isGenerating} />
        </div>
      )}
    </div>
  )
}

