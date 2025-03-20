"use client"

import { useState, type React } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Book,
  GraduationCap,
  Timer,
  Newspaper,
  CheckCircle2,
  Star,
  Wrench,
  Users,
  ScreenShare,
  TargetIcon,
  ListChecks,
  Edit,
  Edit2,
  RefreshCcw,
  BookOpen,
  BookOpenCheck,
  Loader2,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

interface RPPFormData {
  subject: string
  grade: string
  duration: string
  identitasModule: string
  kompetensiAwal: string
  profilPelajarPancasila: string
  saranaPrasarana: string
  targetPesertaDidik: string
  modelPembelajaran: string
  learningObjectives: string
  assessment: string
  refleksiGuru: string
  refleksiPesertaDidik: string
  pengayaanRemedial: string
  bahanBacaan: string
  glosarium: string
}

interface RPPFormProps {
  formData: RPPFormData
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSelectChange: (value: string, field: string) => void
  handleSubmit: (e: React.FormEvent) => void
  isGenerating: boolean
}

const formSteps = [
  {
    title: "Informasi Dasar",
    description: "Masukkan informasi dasar tentang rencana pembelajaran",
    icon: Book,
  },
  {
    title: "Kompetensi & Profil",
    description: "Tentukan kompetensi awal dan profil pelajar",
    icon: CheckCircle2,
  },
  {
    title: "Sarana & Target",
    description: "Tentukan sarana prasarana dan target peserta didik",
    icon: Wrench,
  },
  {
    title: "Tujuan & Penilaian",
    description: "Tetapkan tujuan pembelajaran dan metode penilaian",
    icon: TargetIcon,
  },
  {
    title: "Refleksi & Pengayaan",
    description: "Tambahkan refleksi dan rencana pengayaan",
    icon: Edit,
  },
]

export function RPPForm({ formData, handleInputChange, handleSelectChange, handleSubmit, isGenerating }: RPPFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const goToNextStep = () => {
    if (currentStep < formSteps.length - 1) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep])
      }
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Add the current step to completed steps if not already included
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }

    await handleSubmit(e)
    setIsSubmitting(false)
  }

  const progressPercentage = (completedSteps.length / formSteps.length) * 100

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="subject" className="text-base">
                Mata Pelajaran
              </Label>
              <div className="relative">
                <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/70" />
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="pl-10 h-12 text-base"
                  required
                  placeholder="Contoh: Matematika"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="grade" className="text-base">
                Kelas
              </Label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/70 z-10" />
                <Select value={formData.grade} onValueChange={(value) => handleSelectChange(value, "grade")}>
                  <SelectTrigger className="w-full pl-10 h-12 text-base">
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((g) => (
                      <SelectItem key={g} value={g.toString()}>
                        Kelas {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="duration" className="text-base">
                Durasi
              </Label>
              <div className="relative">
                <Timer className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/70" />
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="pl-10 h-12 text-base"
                  required
                  placeholder="Misal: 2x35 menit"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="identitasModule" className="text-base">
                Identitas Modul
              </Label>
              <div className="relative">
                <Newspaper className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="identitasModule"
                  name="identitasModule"
                  value={formData.identitasModule}
                  onChange={handleInputChange}
                  placeholder="Penyusun, Instansi, dsb."
                  className="pl-10 min-h-[120px] resize-none text-base"
                />
              </div>
            </motion.div>
          </motion.div>
        )
      case 1:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="kompetensiAwal" className="text-base">
                Kompetensi Awal
              </Label>
              <div className="relative">
                <CheckCircle2 className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="kompetensiAwal"
                  name="kompetensiAwal"
                  value={formData.kompetensiAwal}
                  onChange={handleInputChange}
                  placeholder="Kemampuan awal siswa..."
                  className="pl-10 min-h-[120px] resize-none text-base"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="profilPelajarPancasila" className="text-base">
                Profil Pelajar
              </Label>
              <div className="relative">
                <Star className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="profilPelajarPancasila"
                  name="profilPelajarPancasila"
                  value={formData.profilPelajarPancasila}
                  onChange={handleInputChange}
                  placeholder="Beriman, Mandiri, dsb."
                  className="pl-10 min-h-[120px] resize-none text-base"
                />
              </div>
            </motion.div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="saranaPrasarana" className="text-base">
                Sarana & Prasarana
              </Label>
              <div className="relative">
                <Wrench className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="saranaPrasarana"
                  name="saranaPrasarana"
                  value={formData.saranaPrasarana}
                  onChange={handleInputChange}
                  placeholder="Buku, papan tulis, dsb."
                  className="pl-10 min-h-[120px] resize-none text-base"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="targetPesertaDidik" className="text-base">
                Target Peserta Didik
              </Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="targetPesertaDidik"
                  name="targetPesertaDidik"
                  value={formData.targetPesertaDidik}
                  onChange={handleInputChange}
                  placeholder="Misal: 20 siswa"
                  className="pl-10 min-h-[120px] resize-none text-base"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="modelPembelajaran" className="text-base">
                Model Pembelajaran
              </Label>
              <div className="relative">
                <ScreenShare className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="modelPembelajaran"
                  name="modelPembelajaran"
                  value={formData.modelPembelajaran}
                  onChange={handleInputChange}
                  placeholder="Tatap muka, diskusi, dsb."
                  className="pl-10 min-h-[120px] resize-none text-base"
                />
              </div>
            </motion.div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="learningObjectives" className="text-base">
                Tujuan Pembelajaran
              </Label>
              <div className="relative">
                <TargetIcon className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="learningObjectives"
                  name="learningObjectives"
                  value={formData.learningObjectives}
                  onChange={handleInputChange}
                  placeholder="Pisahkan dengan baris baru"
                  className="pl-10 min-h-[120px] resize-none text-base"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="assessment" className="text-base">
                Penilaian
              </Label>
              <div className="relative">
                <ListChecks className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="assessment"
                  name="assessment"
                  value={formData.assessment}
                  onChange={handleInputChange}
                  placeholder="Deskripsi penilaian"
                  className="pl-10 min-h-[120px] resize-none text-base"
                />
              </div>
            </motion.div>
          </motion.div>
        )
      case 4:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="refleksiGuru" className="text-base">
                Refleksi Guru
              </Label>
              <div className="relative">
                <Edit className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="refleksiGuru"
                  name="refleksiGuru"
                  value={formData.refleksiGuru}
                  onChange={handleInputChange}
                  placeholder="Refleksi dari guru..."
                  className="pl-10 min-h-[120px] resize-none text-base"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="refleksiPesertaDidik" className="text-base">
                Refleksi Peserta Didik
              </Label>
              <div className="relative">
                <Edit2 className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="refleksiPesertaDidik"
                  name="refleksiPesertaDidik"
                  value={formData.refleksiPesertaDidik}
                  onChange={handleInputChange}
                  placeholder="Refleksi dari peserta didik..."
                  className="pl-10 min-h-[120px] resize-none text-base"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="pengayaanRemedial" className="text-base">
                Pengayaan & Remedial
              </Label>
              <div className="relative">
                <RefreshCcw className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="pengayaanRemedial"
                  name="pengayaanRemedial"
                  value={formData.pengayaanRemedial}
                  onChange={handleInputChange}
                  placeholder="Rencana pengayaan dan remedial..."
                  className="pl-10 min-h-[120px] resize-none text-base"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="bahanBacaan" className="text-base">
                Bahan Bacaan
              </Label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="bahanBacaan"
                  name="bahanBacaan"
                  value={formData.bahanBacaan}
                  onChange={handleInputChange}
                  placeholder="Daftar bahan bacaan..."
                  className="pl-10 min-h-[120px] resize-none text-base"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="glosarium" className="text-base">
                Glosarium
              </Label>
              <div className="relative">
                <BookOpenCheck className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="glosarium"
                  name="glosarium"
                  value={formData.glosarium}
                  onChange={handleInputChange}
                  placeholder="Daftar istilah penting..."
                  className="pl-10 min-h-[120px] resize-none text-base"
                />
              </div>
            </motion.div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden border-0 shadow-lg">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-primary">{formSteps[currentStep].title}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-primary/70">
                Langkah {currentStep + 1} dari {formSteps.length}
              </span>
            </div>
          </div>
          <p className="text-muted-foreground mb-4">{formSteps[currentStep].description}</p>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="p-6">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              <div key={currentStep} className="min-h-[400px]">
                {renderStepContent()}
              </div>
            </AnimatePresence>

            <div className="flex justify-between pt-4 mt-8 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousStep}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Sebelumnya
              </Button>

              {currentStep < formSteps.length - 1 ? (
                <Button type="button" onClick={goToNextStep} className="gap-2">
                  Selanjutnya
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isGenerating || isSubmitting}
                  className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  {isGenerating || isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating RPP...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Generate RPP
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

