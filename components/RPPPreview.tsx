"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Book,
  GraduationCap,
  Clock,
  CheckCircle2,
  Star,
  Wrench,
  Users,
  ScreenShare,
  TargetIcon,
  ListChecks,
  Edit,
  RefreshCcw,
  BookOpen,
  BookOpenCheck,
  Printer,
  FileText,
  Sparkles,
  Pencil,
} from "lucide-react"

interface RPPPreviewProps {
  generatedRPP: any
  isGenerating: boolean
  onUpdateRPP: (updatedRPP: any) => void
}

export function RPPPreview({ generatedRPP, isGenerating, onUpdateRPP }: RPPPreviewProps) {
  const [activeTab, setActiveTab] = useState("preview")
  const [editMode, setEditMode] = useState(false)
  const [editedRPP, setEditedRPP] = useState(generatedRPP)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedRPP((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSaveChanges = () => {
    onUpdateRPP(editedRPP)
    setEditMode(false)
  }

  const handlePrint = () => {
    window.print()
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">
            {editMode ? (
              <Input
                name="title"
                value={editedRPP.title}
                onChange={handleInputChange}
                className="text-2xl font-bold h-auto py-1 px-2"
              />
            ) : (
              generatedRPP.title
            )}
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800"
            >
              <GraduationCap className="h-3 w-3 mr-1" />
              Kelas {generatedRPP.grade}
            </Badge>
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800"
            >
              <Book className="h-3 w-3 mr-1" />
              {generatedRPP.subject}
            </Badge>
            <Badge
              variant="outline"
              className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800"
            >
              <Clock className="h-3 w-3 mr-1" />
              {generatedRPP.duration}
            </Badge>
          </div>
        </div>

        <div className="flex gap-2">
          {editMode ? (
            <>
              <Button variant="outline" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveChanges} className="gap-2 bg-primary hover:bg-primary-dark">
                <CheckCircle2 className="h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditMode(true)} variant="outline" className="gap-2">
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-md mb-6 bg-background/80 backdrop-blur-sm border p-1 rounded-xl">
          <TabsTrigger
            value="preview"
            className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <FileText className="h-4 w-4 mr-2" />
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="print"
            className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print View
          </TabsTrigger>
          <TabsTrigger
            value="ai-insights"
            className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Book className="h-5 w-5" />
                  Informasi Dasar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground text-sm">Mata Pelajaran</Label>
                    {editMode ? (
                      <Input name="subject" value={editedRPP.subject} onChange={handleInputChange} className="mt-1" />
                    ) : (
                      <p className="font-medium">{generatedRPP.subject}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-sm">Kelas</Label>
                    {editMode ? (
                      <Input name="grade" value={editedRPP.grade} onChange={handleInputChange} className="mt-1" />
                    ) : (
                      <p className="font-medium">{generatedRPP.grade}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-sm">Durasi</Label>
                    {editMode ? (
                      <Input name="duration" value={editedRPP.duration} onChange={handleInputChange} className="mt-1" />
                    ) : (
                      <p className="font-medium">{generatedRPP.duration}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground text-sm">Identitas Modul</Label>
                  {editMode ? (
                    <Textarea
                      name="identitasModule"
                      value={editedRPP.identitasModule}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <p className="whitespace-pre-wrap">{generatedRPP.identitasModule}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                  Kompetensi Awal
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <Textarea
                    name="kompetensiAwal"
                    value={editedRPP.kompetensiAwal}
                    onChange={handleInputChange}
                    className="min-h-[120px]"
                  />
                ) : (
                  <p className="whitespace-pre-wrap">{generatedRPP.kompetensiAwal}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <Star className="h-5 w-5" />
                  Profil Pelajar
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <Textarea
                    name="profilPelajarPancasila"
                    value={editedRPP.profilPelajarPancasila}
                    onChange={handleInputChange}
                    className="min-h-[120px]"
                  />
                ) : (
                  <p className="whitespace-pre-wrap">{generatedRPP.profilPelajarPancasila}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Wrench className="h-5 w-5" />
                  Sarana & Prasarana
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <Textarea
                    name="saranaPrasarana"
                    value={editedRPP.saranaPrasarana}
                    onChange={handleInputChange}
                    className="min-h-[120px]"
                  />
                ) : (
                  <p className="whitespace-pre-wrap">{generatedRPP.saranaPrasarana}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                  <Users className="h-5 w-5" />
                  Target Peserta Didik
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <Textarea
                    name="targetPesertaDidik"
                    value={editedRPP.targetPesertaDidik}
                    onChange={handleInputChange}
                    className="min-h-[120px]"
                  />
                ) : (
                  <p className="whitespace-pre-wrap">{generatedRPP.targetPesertaDidik}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <ScreenShare className="h-5 w-5" />
                  Model Pembelajaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <Textarea
                    name="modelPembelajaran"
                    value={editedRPP.modelPembelajaran}
                    onChange={handleInputChange}
                    className="min-h-[120px]"
                  />
                ) : (
                  <p className="whitespace-pre-wrap">{generatedRPP.modelPembelajaran}</p>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                  <TargetIcon className="h-5 w-5" />
                  Tujuan Pembelajaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <Textarea
                    name="learningObjectives"
                    value={
                      Array.isArray(editedRPP.learningObjectives)
                        ? editedRPP.learningObjectives.join("\n")
                        : editedRPP.learningObjectives
                    }
                    onChange={(e) => {
                      const value = e.target.value
                      setEditedRPP((prev: any) => ({ ...prev, learningObjectives: value.split("\n") }))
                    }}
                    className="min-h-[120px]"
                  />
                ) : (
                  <ul className="list-disc pl-5 space-y-2">
                    {Array.isArray(generatedRPP.learningObjectives) ? (
                      generatedRPP.learningObjectives.map((objective: string, index: number) => (
                        <li key={index}>{objective}</li>
                      ))
                    ) : (
                      <li>{generatedRPP.learningObjectives}</li>
                    )}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                  <ListChecks className="h-5 w-5" />
                  Penilaian
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <Textarea
                    name="assessment"
                    value={editedRPP.assessment}
                    onChange={handleInputChange}
                    className="min-h-[120px]"
                  />
                ) : (
                  <p className="whitespace-pre-wrap">{generatedRPP.assessment}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                  <Edit className="h-5 w-5" />
                  Refleksi Guru
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <Textarea
                    name="refleksiGuru"
                    value={editedRPP.refleksiGuru}
                    onChange={handleInputChange}
                    className="min-h-[120px]"
                  />
                ) : (
                  <p className="whitespace-pre-wrap">{generatedRPP.refleksiGuru}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-violet-600 dark:text-violet-400">
                  <Edit className="h-5 w-5" />
                  Refleksi Peserta Didik
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <Textarea
                    name="refleksiPesertaDidik"
                    value={editedRPP.refleksiPesertaDidik}
                    onChange={handleInputChange}
                    className="min-h-[120px]"
                  />
                ) : (
                  <p className="whitespace-pre-wrap">{generatedRPP.refleksiPesertaDidik}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                  <RefreshCcw className="h-5 w-5" />
                  Pengayaan & Remedial
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <Textarea
                    name="pengayaanRemedial"
                    value={editedRPP.pengayaanRemedial}
                    onChange={handleInputChange}
                    className="min-h-[120px]"
                  />
                ) : (
                  <p className="whitespace-pre-wrap">{generatedRPP.pengayaanRemedial}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <BookOpen className="h-5 w-5" />
                  Bahan Bacaan
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <Textarea
                    name="bahanBacaan"
                    value={editedRPP.bahanBacaan}
                    onChange={handleInputChange}
                    className="min-h-[120px]"
                  />
                ) : (
                  <p className="whitespace-pre-wrap">{generatedRPP.bahanBacaan}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-fuchsia-600 dark:text-fuchsia-400">
                  <BookOpenCheck className="h-5 w-5" />
                  Glosarium
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <Textarea
                    name="glosarium"
                    value={editedRPP.glosarium}
                    onChange={handleInputChange}
                    className="min-h-[120px]"
                  />
                ) : (
                  <p className="whitespace-pre-wrap">{generatedRPP.glosarium}</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="print" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-end mb-6">
                <Button onClick={handlePrint} className="gap-2 bg-primary hover:bg-primary-dark">
                  <Printer className="h-4 w-4" />
                  Print Document
                </Button>
              </div>

              <div className="print:font-serif max-w-4xl mx-auto space-y-8 print:space-y-6">
                <div className="text-center border-b pb-6 print:pb-4">
                  <h1 className="text-2xl font-bold mb-2 print:text-xl">{generatedRPP.title}</h1>
                  <p className="text-muted-foreground">
                    Mata Pelajaran: {generatedRPP.subject} | Kelas: {generatedRPP.grade} | Durasi:{" "}
                    {generatedRPP.duration}
                  </p>
                </div>

                <div className="space-y-6 print:space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2 print:text-lg">Identitas Modul</h2>
                    <p className="whitespace-pre-wrap">{generatedRPP.identitasModule}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2 print:text-lg">Kompetensi Awal</h2>
                    <p className="whitespace-pre-wrap">{generatedRPP.kompetensiAwal}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2 print:text-lg">Profil Pelajar</h2>
                    <p className="whitespace-pre-wrap">{generatedRPP.profilPelajarPancasila}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2 print:text-lg">Sarana & Prasarana</h2>
                    <p className="whitespace-pre-wrap">{generatedRPP.saranaPrasarana}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2 print:text-lg">Target Peserta Didik</h2>
                    <p className="whitespace-pre-wrap">{generatedRPP.targetPesertaDidik}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2 print:text-lg">Model Pembelajaran</h2>
                    <p className="whitespace-pre-wrap">{generatedRPP.modelPembelajaran}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2 print:text-lg">Tujuan Pembelajaran</h2>
                    <ul className="list-disc pl-5 space-y-1">
                      {Array.isArray(generatedRPP.learningObjectives) ? (
                        generatedRPP.learningObjectives.map((objective: string, index: number) => (
                          <li key={index}>{objective}</li>
                        ))
                      ) : (
                        <li>{generatedRPP.learningObjectives}</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2 print:text-lg">Penilaian</h2>
                    <p className="whitespace-pre-wrap">{generatedRPP.assessment}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2 print:text-lg">Refleksi Guru</h2>
                    <p className="whitespace-pre-wrap">{generatedRPP.refleksiGuru}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2 print:text-lg">Refleksi Peserta Didik</h2>
                    <p className="whitespace-pre-wrap">{generatedRPP.refleksiPesertaDidik}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2 print:text-lg">Pengayaan & Remedial</h2>
                    <p className="whitespace-pre-wrap">{generatedRPP.pengayaanRemedial}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2 print:text-lg">Bahan Bacaan</h2>
                    <p className="whitespace-pre-wrap">{generatedRPP.bahanBacaan}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2 print:text-lg">Glosarium</h2>
                    <p className="whitespace-pre-wrap">{generatedRPP.glosarium}</p>
                  </div>
                </div>

                <div className="border-t pt-6 print:pt-4 text-center text-sm text-muted-foreground">
                  <p>Dokumen ini dibuat menggunakan Guru Pintar AI</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">AI Insights & Recommendations</h3>
                  <p className="text-sm text-muted-foreground">
                    Analisis dan saran untuk meningkatkan kualitas RPP Anda
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
                    <TargetIcon className="h-4 w-4" />
                    Tujuan Pembelajaran
                  </h4>
                  <p className="text-sm text-blue-700/80 dark:text-blue-400/80">
                    Tujuan pembelajaran sudah spesifik dan terukur. Pertimbangkan untuk menambahkan aspek HOTS (Higher
                    Order Thinking Skills) untuk mendorong kemampuan berpikir kritis siswa.
                  </p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-medium text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Penilaian
                  </h4>
                  <p className="text-sm text-green-700/80 dark:text-green-400/80">
                    Metode penilaian sudah mencakup beberapa aspek. Pertimbangkan untuk menambahkan rubrik penilaian
                    yang lebih detail untuk memudahkan evaluasi.
                  </p>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <h4 className="font-medium text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Profil Pelajar
                  </h4>
                  <p className="text-sm text-amber-700/80 dark:text-amber-400/80">
                    Profil pelajar sudah mencakup beberapa aspek penting. Pertimbangkan untuk menambahkan aspek "Gotong
                    Royong" dan "Kreatif" untuk melengkapi profil Pelajar Pancasila.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-2 flex items-center gap-2">
                    <ScreenShare className="h-4 w-4" />
                    Model Pembelajaran
                  </h4>
                  <p className="text-sm text-purple-700/80 dark:text-purple-400/80">
                    Model pembelajaran yang dipilih sudah baik. Pertimbangkan untuk menambahkan variasi aktivitas untuk
                    mengakomodasi gaya belajar yang berbeda (visual, auditori, kinestetik).
                  </p>
                </div>

                <div className="mt-8 p-5 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Rekomendasi Keseluruhan
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Tambahkan lebih banyak aktivitas kolaboratif untuk meningkatkan interaksi antar siswa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Integrasikan teknologi digital untuk mendukung pembelajaran</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Tambahkan contoh-contoh kontekstual yang relevan dengan kehidupan sehari-hari siswa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>
                        Pertimbangkan untuk menambahkan diferensiasi pembelajaran untuk mengakomodasi kebutuhan siswa
                        yang beragam
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

