"use client"

import { useState, type ChangeEvent } from "react"
import { motion } from "framer-motion"
import { RPPForm } from "@/components/RPPForm"
import { RPPPreview } from "@/components/RPPPreview"
import { FAKE_RPP_DATA } from "@/app/data/fakeRPPData"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Download,
  FileText,
  Save,
  Share2,
  Sparkles,
  Zap,
  ChevronRight,
  Plus,
  History,
  Star,
  BarChart3,
  Calendar,
} from "lucide-react"
import { SavedRPPList } from "@/components/SavedRPPList"
import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

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

export default function GenerateRPPPage() {
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
    <div className="bg-gradient-soft dark:bg-gradient-soft-dark min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto py-8 px-4 sm:px-6"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
              Generate RPP
            </h1>
            <p className="text-muted-foreground mt-1">Create and customize your lesson plans with AI assistance</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" className="gap-2 shadow-sm">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">Recent</span> Plans
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary shadow-md">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">New</span> AI Plan
            </Button>
          </div>
        </motion.div>

        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 border-blue-200 dark:border-blue-800 overflow-hidden group hover:shadow-lg transition-all duration-300 h-full">
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
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 border-purple-200 dark:border-purple-800 overflow-hidden group hover:shadow-lg transition-all duration-300 h-full">
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
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/20 border-green-200 dark:border-green-800 overflow-hidden group hover:shadow-lg transition-all duration-300 h-full">
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

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20 border-amber-200 dark:border-amber-800 overflow-hidden group hover:shadow-lg transition-all duration-300 h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <p className="text-sm text-muted-foreground">Upcoming classes</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 p-0 h-auto text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                >
                  <span>View schedule</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <Card className="bg-gradient-to-r from-primary/5 to-transparent border-primary/20 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Premium Features Available</h3>
                    <p className="text-sm text-muted-foreground">Upgrade to access advanced AI lesson planning tools</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                    <BarChart3 className="h-3.5 w-3.5 mr-1" />
                    7-day trial
                  </Badge>
                  <Button size="sm" className="bg-primary hover:bg-primary-dark">
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <TabsList className="w-full max-w-md mb-4 sm:mb-0 bg-background/80 backdrop-blur-sm border p-1 rounded-xl">
                <TabsTrigger
                  value="create"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Plan
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  disabled={!generatedRPP}
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
                <TabsTrigger
                  value="saved"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Saved Plans
                </TabsTrigger>
              </TabsList>

              {activeTab === "preview" && generatedRPP && (
                <div className="flex gap-2 mt-4 sm:mt-0">
                  <Button variant="outline" size="sm" className="gap-2 shadow-sm">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 shadow-sm">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button
                    size="sm"
                    className="gap-2 bg-primary hover:bg-primary-dark shadow-sm"
                    onClick={handleSaveRPP}
                    disabled={isSaving}
                  >
                    <Save className="h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Plan"}
                  </Button>
                </div>
              )}
            </div>

            <TabsContent value="create" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-background/60 backdrop-blur-sm rounded-xl p-1 shadow-lg"
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
                  className="bg-background/60 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                >
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
                className="bg-background/60 backdrop-blur-sm rounded-xl p-6 shadow-lg"
              >
                <SavedRPPList savedRPPList={savedRPPs} />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
} 