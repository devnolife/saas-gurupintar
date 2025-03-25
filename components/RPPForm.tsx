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
  HelpCircle,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    title: "Kompetensi & Profil",
    description: "Tentukan kompetensi awal dan profil pelajar",
    icon: CheckCircle2,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
  {
    title: "Sarana & Target",
    description: "Tentukan sarana prasarana dan target peserta didik",
    icon: Wrench,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
  },
  {
    title: "Tujuan & Penilaian",
    description: "Tetapkan tujuan pembelajaran dan metode penilaian",
    icon: TargetIcon,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    title: "Refleksi & Pengayaan",
    description: "Tambahkan refleksi dan rencana pengayaan",
    icon: Edit,
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-100 dark:bg-rose-900/30",
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

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-between mb-8 w-full max-w-3xl mx-auto">
        {formSteps.map((step, index) => {
          const isCompleted = completedSteps.includes(index)
          const isCurrent = currentStep === index

          return (
            <div key={index} className="flex flex-col items-center relative">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center z-10
                  transition-all duration-300
                  ${isCurrent ? "ring-2 ring-offset-2 ring-primary" : ""}
                  ${isCompleted ? step.bgColor : "bg-gray-100 dark:bg-gray-800"}
                `}
                onClick={() => setCurrentStep(index)}
              >
                {isCompleted ? (
                  <CheckCircle className={`h-5 w-5 ${step.color}`} />
                ) : (
                  <step.icon className={`h-5 w-5 ${isCurrent ? "text-primary" : "text-gray-400"}`} />
                )}
              </div>

              <span
                className={`
                text-xs font-medium mt-2 text-center hidden md:block
                ${isCurrent ? "text-primary font-semibold" : isCompleted ? step.color : "text-gray-500"}
              `}
              >
                {step.title}
              </span>

              {/* Connector line */}
              {index < formSteps.length - 1 && (
                <div className="absolute top-5 left-10 w-[calc(100%-20px)] h-[2px] -translate-y-1/2 z-0">
                  <div
                    className={`
                    h-full bg-gray-200 dark:bg-gray-700
                    ${index < currentStep ? step.bgColor : ""}
                  `}
                  ></div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const renderFieldWithTooltip = (label: string, id: string, tooltipText: string, component: React.ReactNode) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor={id} className="text-base font-medium">
            {label}
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Help</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {component}
      </div>
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            {renderFieldWithTooltip(
              "Mata Pelajaran",
              "subject",
              "Masukkan nama mata pelajaran yang akan diajarkan",
              <div className="relative">
                <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/70" />
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="pl-10 h-12 text-base rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                  required
                  placeholder="Contoh: Matematika"
                />
              </div>,
            )}

            {renderFieldWithTooltip(
              "Kelas",
              "grade",
              "Pilih kelas yang akan diajarkan",
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/70 z-10" />
                <Select value={formData.grade} onValueChange={(value) => handleSelectChange(value, "grade")}>
                  <SelectTrigger className="w-full pl-10 h-12 text-base rounded-lg border-gray-300 dark:border-gray-700">
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
              </div>,
            )}

            {renderFieldWithTooltip(
              "Durasi",
              "duration",
              "Masukkan durasi pembelajaran dalam format jumlah pertemuan x menit",
              <div className="relative">
                <Timer className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/70" />
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="pl-10 h-12 text-base rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                  required
                  placeholder="Misal: 2x35 menit"
                />
              </div>,
            )}

            {renderFieldWithTooltip(
              "Identitas Modul",
              "identitasModule",
              "Masukkan informasi tentang penyusun, instansi, dan informasi identitas lainnya",
              <div className="relative">
                <Newspaper className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="identitasModule"
                  name="identitasModule"
                  value={formData.identitasModule}
                  onChange={handleInputChange}
                  placeholder="Penyusun, Instansi, dsb."
                  className="pl-10 min-h-[120px] resize-none text-base rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                />
              </div>,
            )}
          </motion.div>
        )
      case 1:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            {renderFieldWithTooltip(
              "Kompetensi Awal",
              "kompetensiAwal",
              "Deskripsikan kemampuan awal yang diharapkan sudah dimiliki siswa",
              <div className="relative">
                <CheckCircle2 className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="kompetensiAwal"
                  name="kompetensiAwal"
                  value={formData.kompetensiAwal}
                  onChange={handleInputChange}
                  placeholder="Kemampuan awal siswa..."
                  className="pl-10 min-h-[120px] resize-none text-base rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                />
              </div>,
            )}

            {renderFieldWithTooltip(
              "Profil Pelajar",
              "profilPelajarPancasila",
              "Deskripsikan profil pelajar yang diharapkan sesuai dengan nilai-nilai Pancasila",
              <div className="relative">
                <Star className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="profilPelajarPancasila"
                  name="profilPelajarPancasila"
                  value={formData.profilPelajarPancasila}
                  onChange={handleInputChange}
                  placeholder="Beriman, Mandiri, dsb."
                  className="pl-10 min-h-[120px] resize-none text-base rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 cursor-pointer"
                    onClick={() => {
                      const value =
                        formData.profilPelajarPancasila +
                        (formData.profilPelajarPancasila ? ", " : "") +
                        "Beriman dan Bertakwa"
                      handleInputChange({ target: { name: "profilPelajarPancasila", value } } as any)
                    }}
                  >
                    + Beriman dan Bertakwa
                  </Badge>
                  <Badge
                    className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 cursor-pointer"
                    onClick={() => {
                      const value =
                        formData.profilPelajarPancasila + (formData.profilPelajarPancasila ? ", " : "") + "Mandiri"
                      handleInputChange({ target: { name: "profilPelajarPancasila", value } } as any)
                    }}
                  >
                    + Mandiri
                  </Badge>
                  <Badge
                    className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 hover:bg-amber-200 cursor-pointer"
                    onClick={() => {
                      const value =
                        formData.profilPelajarPancasila +
                        (formData.profilPelajarPancasila ? ", " : "") +
                        "Bernalar Kritis"
                      handleInputChange({ target: { name: "profilPelajarPancasila", value } } as any)
                    }}
                  >
                    + Bernalar Kritis
                  </Badge>
                </div>
              </div>,
            )}
          </motion.div>
        )
      case 2:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            {renderFieldWithTooltip(
              "Sarana & Prasarana",
              "saranaPrasarana",
              "Deskripsikan sarana dan prasarana yang dibutuhkan untuk pembelajaran",
              <div className="relative">
                <Wrench className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="saranaPrasarana"
                  name="saranaPrasarana"
                  value={formData.saranaPrasarana}
                  onChange={handleInputChange}
                  placeholder="Buku, papan tulis, dsb."
                  className="pl-10 min-h-[120px] resize-none text-base rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 cursor-pointer"
                    onClick={() => {
                      const value = formData.saranaPrasarana + (formData.saranaPrasarana ? ", " : "") + "Buku Teks"
                      handleInputChange({ target: { name: "saranaPrasarana", value } } as any)
                    }}
                  >
                    + Buku Teks
                  </Badge>
                  <Badge
                    className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 cursor-pointer"
                    onClick={() => {
                      const value = formData.saranaPrasarana + (formData.saranaPrasarana ? ", " : "") + "Papan Tulis"
                      handleInputChange({ target: { name: "saranaPrasarana", value } } as any)
                    }}
                  >
                    + Papan Tulis
                  </Badge>
                  <Badge
                    className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 hover:bg-amber-200 cursor-pointer"
                    onClick={() => {
                      const value = formData.saranaPrasarana + (formData.saranaPrasarana ? ", " : "") + "Proyektor"
                      handleInputChange({ target: { name: "saranaPrasarana", value } } as any)
                    }}
                  >
                    + Proyektor
                  </Badge>
                </div>
              </div>,
            )}

            {renderFieldWithTooltip(
              "Target Peserta Didik",
              "targetPesertaDidik",
              "Deskripsikan target peserta didik, termasuk jumlah dan karakteristik",
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="targetPesertaDidik"
                  name="targetPesertaDidik"
                  value={formData.targetPesertaDidik}
                  onChange={handleInputChange}
                  placeholder="Misal: 20 siswa"
                  className="pl-10 min-h-[120px] resize-none text-base rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                />
              </div>,
            )}

            {renderFieldWithTooltip(
              "Model Pembelajaran",
              "modelPembelajaran",
              "Deskripsikan model pembelajaran yang akan digunakan",
              <div className="relative">
                <ScreenShare className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="modelPembelajaran"
                  name="modelPembelajaran"
                  value={formData.modelPembelajaran}
                  onChange={handleInputChange}
                  placeholder="Tatap muka, diskusi, dsb."
                  className="pl-10 min-h-[120px] resize-none text-base rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 cursor-pointer"
                    onClick={() => {
                      const value =
                        formData.modelPembelajaran +
                        (formData.modelPembelajaran ? ", " : "") +
                        "Pembelajaran Berbasis Proyek"
                      handleInputChange({ target: { name: "modelPembelajaran", value } } as any)
                    }}
                  >
                    + Pembelajaran Berbasis Proyek
                  </Badge>
                  <Badge
                    className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 cursor-pointer"
                    onClick={() => {
                      const value =
                        formData.modelPembelajaran + (formData.modelPembelajaran ? ", " : "") + "Diskusi Kelompok"
                      handleInputChange({ target: { name: "modelPembelajaran", value } } as any)
                    }}
                  >
                    + Diskusi Kelompok
                  </Badge>
                </div>
              </div>,
            )}
          </motion.div>
        )
      case 3:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            {renderFieldWithTooltip(
              "Tujuan Pembelajaran",
              "learningObjectives",
              "Deskripsikan tujuan pembelajaran yang ingin dicapai, pisahkan dengan baris baru",
              <div className="relative">
                <TargetIcon className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="learningObjectives"
                  name="learningObjectives"
                  value={formData.learningObjectives}
                  onChange={handleInputChange}
                  placeholder="Pisahkan dengan baris baru"
                  className="pl-10 min-h-[120px] resize-none text-base rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                />
              </div>,
            )}

            {renderFieldWithTooltip(
              "Penilaian",
              "assessment",
              "Deskripsikan metode penilaian yang akan digunakan",
              <div className="relative">
                <ListChecks className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="assessment"
                  name="assessment"
                  value={formData.assessment}
                  onChange={handleInputChange}
                  placeholder="Deskripsi penilaian"
                  className="pl-10 min-h-[120px] resize-none text-base rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 cursor-pointer"
                    onClick={() => {
                      const value = formData.assessment + (formData.assessment ? ", " : "") + "Tes Tertulis"
                      handleInputChange({ target: { name: "assessment", value } } as any)
                    }}
                  >
                    + Tes Tertulis
                  </Badge>
                  <Badge
                    className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 cursor-pointer"
                    onClick={() => {
                      const value = formData.assessment + (formData.assessment ? ", " : "") + "Observasi"
                      handleInputChange({ target: { name: "assessment", value } } as any)
                    }}
                  >
                    + Observasi
                  </Badge>
                  <Badge
                    className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 hover:bg-amber-200 cursor-pointer"
                    onClick={() => {
                      const value = formData.assessment + (formData.assessment ? ", " : "") + "Portofolio"
                      handleInputChange({ target: { name: "assessment", value } } as any)
                    }}
                  >
                    + Portofolio
                  </Badge>
                </div>
              </div>,
            )}
          </motion.div>
        )
      case 4:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            {renderFieldWithTooltip(
              "Refleksi Guru",
              "refleksiGuru",
              "Deskripsikan refleksi dari guru tentang proses pembelajaran",
              <div className="relative">
                <Edit className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="refleksiGuru"
                  name="refleksiGuru"
                  value={formData.refleksiGuru}
                  onChange={handleInputChange}
                  placeholder="Refleksi dari guru..."
                  className="pl-10 min-h-[120px] resize-none text-base rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                />
              </div>,
            )}

            {renderFieldWithTooltip(
              "Refleksi Peserta Didik",
              "refleksiPesertaDidik",
              "Deskripsikan refleksi dari peserta didik tentang proses pembelajaran",
              <div className="relative">
                <Edit2 className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="refleksiPesertaDidik"
                  name="refleksiPesertaDidik"
                  value={formData.refleksiPesertaDidik}
                  onChange={handleInputChange}
                  placeholder="Refleksi dari peserta didik..."
                  className="pl-10 min-h-[120px] resize-none text-base rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                />
              </div>,
            )}

            {renderFieldWithTooltip(
              "Pengayaan & Remedial",
              "pengayaanRemedial",
              "Deskripsikan rencana pengayaan dan remedial",
              <div className="relative">
                <RefreshCcw className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="pengayaanRemedial"
                  name="pengayaanRemedial"
                  value={formData.pengayaanRemedial}
                  onChange={handleInputChange}
                  placeholder="Rencana pengayaan dan remedial..."
                  className="pl-10 min-h-[120px] resize-none text-base rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                />
              </div>,
            )}

            {renderFieldWithTooltip(
              "Bahan Bacaan",
              "bahanBacaan",
              "Deskripsikan bahan bacaan yang digunakan",
              <div className="relative">
                <BookOpen className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="bahanBacaan"
                  name="bahanBacaan"
                  value={formData.bahanBacaan}
                  onChange={handleInputChange}
                  placeholder="Daftar bahan bacaan..."
                  className="pl-10 min-h-[120px] resize-none text-base rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                />
              </div>,
            )}

            {renderFieldWithTooltip(
              "Glosarium",
              "glosarium",
              "Deskripsikan istilah-istilah penting dalam pembelajaran",
              <div className="relative">
                <BookOpenCheck className="absolute left-3 top-3 h-4 w-4 text-primary/70" />
                <Textarea
                  id="glosarium"
                  name="glosarium"
                  value={formData.glosarium}
                  onChange={handleInputChange}
                  placeholder="Daftar istilah penting..."
                  className="pl-10 min-h-[120px] resize-none text-base rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                />
              </div>,
            )}
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-900">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-primary">{formSteps[currentStep].title}</h3>
              <p className="text-muted-foreground">{formSteps[currentStep].description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                Langkah {currentStep + 1} dari {formSteps.length}
              </Badge>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="p-6">
          {renderStepIndicator()}

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
                className="gap-2 shadow-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Sebelumnya
              </Button>

              {currentStep < formSteps.length - 1 ? (
                <Button
                  type="button"
                  onClick={goToNextStep}
                  className="gap-2 bg-primary hover:bg-primary-dark shadow-sm"
                >
                  Selanjutnya
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isGenerating || isSubmitting}
                  className="gap-2 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary shadow-md"
                >
                  {isGenerating || isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating RPP...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
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

