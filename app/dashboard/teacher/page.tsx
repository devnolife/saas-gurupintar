"use client"

import { useState, type ChangeEvent } from "react"
import { RPPForm } from "@/components/RPPForm"
import { RPPPreview } from "@/components/RPPPreview"
import { FAKE_RPP_DATA } from "@/app/data/fakeRPPData"

interface RPPFormData {
  subject: string;
  grade: string;
  duration: string;
  identitasModule: string;
  kompetensiAwal: string;
  profilPelajarPancasila: string;
  saranaPrasarana: string;
  targetPesertaDidik: string;
  modelPembelajaran: string;
  learningObjectives: string;
  assessment: string;
  refleksiGuru: string;
  refleksiPesertaDidik: string;
  pengayaanRemedial: string;
  bahanBacaan: string;
  glosarium: string;
}

interface GeneratedRPP extends Omit<RPPFormData, "learningObjectives"> {
  title: string;
  learningObjectives: string[]; // converted from input string to array
  activities: unknown[]; // replaced "any[]" with "unknown[]"
}

const generateRPP = async (formData: RPPFormData): Promise<GeneratedRPP> => {
  // simulasi loading 2 detik
  await new Promise((resolve) => setTimeout(resolve, 2000))

  let matched = FAKE_RPP_DATA.find(
    (rpp) => rpp.subject.toLowerCase() === formData.subject.toLowerCase() && rpp.grade === formData.grade,
  )

  // jika tidak ketemu data yang cocok, ambil random
  if (!matched) {
    matched = FAKE_RPP_DATA[Math.floor(Math.random() * FAKE_RPP_DATA.length)]
  }

  // hasil generate
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
    activities: matched.activities || [],
  }
}

export default function TeacherDashboardPage() {
  const [formData, setFormData] = useState<RPPFormData>({
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
  const [generatedRPP, setGeneratedRPP] = useState<GeneratedRPP | null>(null)

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

  // Fungsi untuk "Generate Ulang"
  const handleRegenerate = () => {
    // Hapus data preview
    setGeneratedRPP(null)
    // Kembalikan formData menjadi kosong
    setFormData({
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
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>

      {!generatedRPP && (
        <div className="w-full">
          <RPPForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleSubmit={handleSubmit}
            isGenerating={isGenerating}
          />
        </div>
      )}

      {generatedRPP && (
        <div className="w-full mt-6">
          <h2 className="text-2xl font-semibold mb-4">Preview</h2>
          <RPPPreview generatedRPP={generatedRPP} isGenerating={isGenerating} />

          <button
            onClick={handleRegenerate}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Generate Ulang
          </button>
        </div>
      )}
    </div>
  )
}
