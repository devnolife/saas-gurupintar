"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

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

export function RPPForm({ formData, handleInputChange, handleSelectChange, handleSubmit, isGenerating }: RPPFormProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Informasi Dasar</h3>

              <div className="space-y-2">
                <Label htmlFor="subject">Mata Pelajaran</Label>
                <div className="relative">
                  <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade">Kelas</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 z-10" />
                  <Select value={formData.grade} onValueChange={(value) => handleSelectChange(value, "grade")}>
                    <SelectTrigger className="w-full pl-10">
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Durasi</Label>
                <div className="relative">
                  <Timer className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                    placeholder="Misal: 2x35 menit"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Identitas & Kompetensi</h3>

              <div className="space-y-2">
                <Label htmlFor="identitasModule">Identitas Modul</Label>
                <div className="relative">
                  <Newspaper className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Textarea
                    id="identitasModule"
                    name="identitasModule"
                    value={formData.identitasModule}
                    onChange={handleInputChange}
                    placeholder="Penyusun, Instansi, dsb."
                    className="pl-10 min-h-[120px] resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="kompetensiAwal">Kompetensi Awal</Label>
                <div className="relative">
                  <CheckCircle2 className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Textarea
                    id="kompetensiAwal"
                    name="kompetensiAwal"
                    value={formData.kompetensiAwal}
                    onChange={handleInputChange}
                    placeholder="Kemampuan awal siswa..."
                    className="pl-10 min-h-[120px] resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profilPelajarPancasila">Profil Pelajar</Label>
                <div className="relative">
                  <Star className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Textarea
                    id="profilPelajarPancasila"
                    name="profilPelajarPancasila"
                    value={formData.profilPelajarPancasila}
                    onChange={handleInputChange}
                    placeholder="Beriman, Mandiri, dsb."
                    className="pl-10 min-h-[120px] resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Sarana & Target</h3>

              <div className="space-y-2">
                <Label htmlFor="saranaPrasarana">Sarana & Prasarana</Label>
                <div className="relative">
                  <Wrench className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Textarea
                    id="saranaPrasarana"
                    name="saranaPrasarana"
                    value={formData.saranaPrasarana}
                    onChange={handleInputChange}
                    placeholder="Buku, papan tulis, dsb."
                    className="pl-10 min-h-[120px] resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetPesertaDidik">Target Peserta Didik</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Textarea
                    id="targetPesertaDidik"
                    name="targetPesertaDidik"
                    value={formData.targetPesertaDidik}
                    onChange={handleInputChange}
                    placeholder="Misal: 20 siswa"
                    className="pl-10 min-h-[120px] resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="modelPembelajaran">Model Pembelajaran</Label>
                <div className="relative">
                  <ScreenShare className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Textarea
                    id="modelPembelajaran"
                    name="modelPembelajaran"
                    value={formData.modelPembelajaran}
                    onChange={handleInputChange}
                    placeholder="Tatap muka, diskusi, dsb."
                    className="pl-10 min-h-[120px] resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Tujuan & Penilaian</h3>

              <div className="space-y-2">
                <Label htmlFor="learningObjectives">Tujuan Pembelajaran</Label>
                <div className="relative">
                  <TargetIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Textarea
                    id="learningObjectives"
                    name="learningObjectives"
                    value={formData.learningObjectives}
                    onChange={handleInputChange}
                    placeholder="Pisahkan dengan baris baru"
                    className="pl-10 min-h-[120px] resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assessment">Penilaian</Label>
                <div className="relative">
                  <ListChecks className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Textarea
                    id="assessment"
                    name="assessment"
                    value={formData.assessment}
                    onChange={handleInputChange}
                    placeholder="Deskripsi penilaian"
                    className="pl-10 min-h-[120px] resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Refleksi & Pengayaan</h3>

              <div className="space-y-2">
                <Label htmlFor="refleksiGuru">Refleksi Guru</Label>
                <div className="relative">
                  <Edit className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Textarea
                    id="refleksiGuru"
                    name="refleksiGuru"
                    value={formData.refleksiGuru}
                    onChange={handleInputChange}
                    className="pl-10 min-h-[120px] resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="refleksiPesertaDidik">Refleksi Peserta Didik</Label>
                <div className="relative">
                  <Edit2 className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Textarea
                    id="refleksiPesertaDidik"
                    name="refleksiPesertaDidik"
                    value={formData.refleksiPesertaDidik}
                    onChange={handleInputChange}
                    className="pl-10 min-h-[120px] resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pengayaanRemedial">Pengayaan & Remedial</Label>
                <div className="relative">
                  <RefreshCcw className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Textarea
                    id="pengayaanRemedial"
                    name="pengayaanRemedial"
                    value={formData.pengayaanRemedial}
                    onChange={handleInputChange}
                    className="pl-10 min-h-[120px] resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Bahan Bacaan & Glosarium</h3>

              <div className="space-y-2">
                <Label htmlFor="bahanBacaan">Bahan Bacaan</Label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Textarea
                    id="bahanBacaan"
                    name="bahanBacaan"
                    value={formData.bahanBacaan}
                    onChange={handleInputChange}
                    className="pl-10 min-h-[120px] resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="glosarium">Glosarium</Label>
                <div className="relative">
                  <BookOpenCheck className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Textarea
                    id="glosarium"
                    name="glosarium"
                    value={formData.glosarium}
                    onChange={handleInputChange}
                    className="pl-10 min-h-[120px] resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isGenerating}>
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
  )
}

