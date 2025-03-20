"use client"

import { useState, type ChangeEvent, type React } from "react"
import { motion } from "framer-motion"
import { RPPForm } from "@/components/RPPForm"
import { RPPPreview } from "@/components/RPPPreview"
import { FAKE_RPP_DATA } from "@/app/data/fakeRPPData"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Download, FileText, Save, Share2, Sparkles, Zap, ChevronRight } from "lucide-react"
import { SavedRPPList } from "@/components/SavedRPPList"
import { toast } from "@/hooks/use-toast"
import { PageWrapper } from "@/components/PageWrapper"

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

// Sample data for saved RPPs
const sampleSavedRPPs = [
  {
    id: "rpp-001",
    title: "Matematika: Persamaan Kuadrat",
    subject: "Matematika",
    grade: "X",
    duration: "3 x 45 menit",
    kompetensiAwal: "Siswa dapat memahami konsep dasar persamaan kuadrat dan metode penyelesaiannya.",
    createdAt: "2023-10-15",
  },
  {
    id: "rpp-002",
    title: "Bahasa Indonesia: Teks Eksposisi",
    subject: "Bahasa Indonesia",
    grade: "XI",
    duration: "2 x 45 menit",
    kompetensiAwal: "Siswa dapat mengidentifikasi struktur dan ciri kebahasaan teks eksposisi.",
    createdAt: "2023-10-20",
  },
  {
    id: "rpp-003",
    title: "Biologi: Sistem Peredaran Darah",
    subject: "Biologi",
    grade: "XI",
    duration: "4 x 45 menit",
    kompetensiAwal: "Siswa dapat menjelaskan komponen dan fungsi sistem peredaran darah pada manusia.",
    createdAt: "2023-11-05",
  },
  {
    id: "rpp-004",
    title: "Fisika: Hukum Newton",
    subject: "Fisika",
    grade: "X",
    duration: "3 x 45 menit",
    kompetensiAwal: "Siswa dapat memahami dan menerapkan hukum Newton tentang gerak dan gaya.",
    createdAt: "2023-11-12",
  },
]

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
  const [activeTab, setActiveTab] = useState("create")
  const [isSaving, setIsSaving] = useState(false)
  const [savedRPPs, setSavedRPPs] = useState(sampleSavedRPPs)

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
      setActiveTab("preview")
    } catch (error) {
      console.error("Error generating RPP:", error)
    }
    setIsGenerating(false)
  }

  const handleUpdateRPP = (updatedRPP: any) => {
    setGeneratedRPP(updatedRPP)
    toast({
      title: "Changes saved",
      description: "Your changes to the lesson plan have been saved.",
    })
  }

  const handleSaveRPP = async () => {
    if (!generatedRPP) return

    setIsSaving(true)
    // Simulate saving to database
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Add the new RPP to the saved list
    const newRPP = {
      id: `rpp-${Date.now()}`,
      title: generatedRPP.title,
      subject: generatedRPP.subject,
      grade: generatedRPP.grade,
      duration: generatedRPP.duration,
      kompetensiAwal: generatedRPP.kompetensiAwal,
      createdAt: new Date().toISOString(),
    }

    setSavedRPPs((prev) => [newRPP, ...prev])
    setIsSaving(false)

    toast({
      title: "Lesson plan saved",
      description: "Your lesson plan has been saved successfully.",
    })
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
    <PageWrapper>
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
              Teacher Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Create and manage your lesson plans with AI assistance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Clock className="h-4 w-4" />
              Recent Plans
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              <Sparkles className="h-4 w-4" />
              New AI Plan
            </Button>
          </div>
        </motion.div>

        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 border-blue-200 dark:border-blue-800 overflow-hidden group hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                  <BookOpen className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Lesson Plans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{savedRPPs.length}</div>
                <p className="text-sm text-muted-foreground">Created this month</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 p-0 h-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  onClick={() => setActiveTab("saved")}
                >
                  <span>View all</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 border-purple-200 dark:border-purple-800 overflow-hidden group hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
                  <FileText className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Syllabi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4</div>
                <p className="text-sm text-muted-foreground">Active syllabi</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 p-0 h-auto text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                >
                  <span>View all</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/20 border-green-200 dark:border-green-800 overflow-hidden group hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <Zap className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  AI Credits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">85</div>
                <p className="text-sm text-muted-foreground">Remaining this month</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 p-0 h-auto text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                >
                  <span>Get more</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-6 bg-primary/5 p-1">
              <TabsTrigger
                value="create"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Create Plan
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                disabled={!generatedRPP}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="saved"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Saved Plans
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <RPPForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSelectChange={handleSelectChange}
                  handleSubmit={handleSubmit}
                  isGenerating={isGenerating}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="preview" className="mt-0">
              {generatedRPP && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4 flex justify-end gap-2">
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button className="gap-2" onClick={handleSaveRPP} disabled={isSaving}>
                      <Save className="h-4 w-4" />
                      {isSaving ? "Saving..." : "Save Plan"}
                    </Button>
                  </div>
                  <RPPPreview generatedRPP={generatedRPP} isGenerating={isGenerating} onUpdateRPP={handleUpdateRPP} />
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="saved" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SavedRPPList savedRPPList={savedRPPs} />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </PageWrapper>
  )
}

