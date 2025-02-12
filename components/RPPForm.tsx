"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

// Mengganti Tools dengan Wrench dan MonitorShare dengan ScreenShare
import {
  Book,
  GraduationCap,
  Timer,
  Newspaper,
  CheckCircle2,
  Star,
  Wrench, // sebelumnya Tools
  Users,
  ScreenShare, // sebelumnya MonitorShare
  Target as TargetIcon,
  ListChecks,
  Edit,
  Edit2,
  RefreshCcw,
  BookOpen,
  BookOpenCheck,
  Loader2,
} from "lucide-react"

interface RPPFormProps {
  formData: any
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSelectChange: (value: string, field: string) => void
  handleSubmit: (e: React.FormEvent) => void
  isGenerating: boolean
}

export function RPPForm({
  formData,
  handleInputChange,
  handleSelectChange,
  handleSubmit,
  isGenerating,
}: RPPFormProps) {
  return (
    <Card className="w-full mt-2">
      <CardContent className="w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Informasi Dasar</h3>
                <div className="space-y-4">
                  {/* Mata Pelajaran */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Mata Pelajaran</Label>
                    <div className="relative">
                      <Book className="absolute top-3 left-2 h-4 w-4 text-gray-500" />
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="pl-8"
                      />
                    </div>
                  </div>

                  {/* Kelas */}
                  <div className="space-y-2">
                    <Label htmlFor="grade">Kelas</Label>
                    <div className="relative">
                      <GraduationCap className="absolute top-3 left-2 h-4 w-4 text-gray-500 pointer-events-none" />
                      <Select
                        value={formData.grade}
                        onValueChange={(value) => handleSelectChange(value, "grade")}
                      >
                        <SelectTrigger className="pl-9">
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

                  {/* Durasi */}
                  <div className="space-y-2">
                    <Label htmlFor="duration">Durasi</Label>
                    <div className="relative">
                      <Timer className="absolute top-3 left-2 h-4 w-4 text-gray-500" />
                      <Input
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        required
                        placeholder="Misal: 2x35 menit"
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Identitas dan Kompetensi */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Identitas dan Kompetensi</h3>
                <div className="space-y-4">
                  {/* Identitas Modul */}
                  <div className="space-y-2">
                    <Label htmlFor="identitasModule">Identitas Modul</Label>
                    <div className="relative">
                      <Newspaper className="absolute top-3 left-2 h-4 w-4 text-gray-500" />
                      <Textarea
                        id="identitasModule"
                        name="identitasModule"
                        value={formData.identitasModule}
                        onChange={handleInputChange}
                        placeholder="Penyusun, Instansi, Fase/Kelas, dsb."
                        className="pl-8"
                      />
                    </div>
                  </div>

                  {/* Kompetensi Awal */}
                  <div className="space-y-2">
                    <Label htmlFor="kompetensiAwal">Kompetensi Awal</Label>
                    <div className="relative">
                      <CheckCircle2 className="absolute top-3 left-2 h-4 w-4 text-gray-500" />
                      <Textarea
                        id="kompetensiAwal"
                        name="kompetensiAwal"
                        value={formData.kompetensiAwal}
                        onChange={handleInputChange}
                        placeholder="Kemampuan awal siswa..."
                        className="pl-8"
                      />
                    </div>
                  </div>

                  {/* Profil Pelajar Pancasila */}
                  <div className="space-y-2">
                    <Label htmlFor="profilPelajarPancasila">Profil Pelajar Pancasila</Label>
                    <div className="relative">
                      <Star className="absolute top-3 left-2 h-4 w-4 text-gray-500" />
                      <Textarea
                        id="profilPelajarPancasila"
                        name="profilPelajarPancasila"
                        value={formData.profilPelajarPancasila}
                        onChange={handleInputChange}
                        placeholder="Beriman, Mandiri, dsb."
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom kanan */}
            <div className="space-y-6">
              {/* Sarana dan Target */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Sarana dan Target</h3>
                <div className="space-y-4">
                  {/* Sarana & Prasarana */}
                  <div className="space-y-2">
                    <Label htmlFor="saranaPrasarana">Sarana & Prasarana</Label>
                    <div className="relative">
                      <Wrench className="absolute top-3 left-2 h-4 w-4 text-gray-500" />
                      <Textarea
                        id="saranaPrasarana"
                        name="saranaPrasarana"
                        value={formData.saranaPrasarana}
                        onChange={handleInputChange}
                        placeholder="Buku, papan tulis, media konkret..."
                        className="pl-8"
                      />
                    </div>
                  </div>

                  {/* Target Peserta Didik */}
                  <div className="space-y-2">
                    <Label htmlFor="targetPesertaDidik">Target Peserta Didik</Label>
                    <div className="relative">
                      <Users className="absolute top-3 left-2 h-4 w-4 text-gray-500" />
                      <Textarea
                        id="targetPesertaDidik"
                        name="targetPesertaDidik"
                        value={formData.targetPesertaDidik}
                        onChange={handleInputChange}
                        placeholder="Misal: Peserta didik reguler 20 siswa"
                        className="pl-8"
                      />
                    </div>
                  </div>

                  {/* Model Pembelajaran */}
                  <div className="space-y-2">
                    <Label htmlFor="modelPembelajaran">Model Pembelajaran</Label>
                    <div className="relative">
                      <ScreenShare className="absolute top-3 left-2 h-4 w-4 text-gray-500" />
                      <Textarea
                        id="modelPembelajaran"
                        name="modelPembelajaran"
                        value={formData.modelPembelajaran}
                        onChange={handleInputChange}
                        placeholder="Tatap muka, diskusi kelompok, dsb."
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Tujuan dan Penilaian */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Tujuan dan Penilaian</h3>
                <div className="space-y-4">
                  {/* Tujuan Pembelajaran */}
                  <div className="space-y-2">
                    <Label htmlFor="learningObjectives">Tujuan Pembelajaran</Label>
                    <div className="relative">
                      <TargetIcon className="absolute top-3 left-2 h-4 w-4 text-gray-500" />
                      <Textarea
                        id="learningObjectives"
                        name="learningObjectives"
                        value={formData.learningObjectives}
                        onChange={handleInputChange}
                        placeholder="Pisahkan dengan baris baru"
                        className="min-h-[80px] pl-8"
                      />
                    </div>
                  </div>

                  {/* Penilaian */}
                  <div className="space-y-2">
                    <Label htmlFor="assessment">Penilaian (Assessment)</Label>
                    <div className="relative">
                      <ListChecks className="absolute top-3 left-2 h-4 w-4 text-gray-500" />
                      <Textarea
                        id="assessment"
                        name="assessment"
                        value={formData.assessment}
                        onChange={handleInputChange}
                        placeholder="Deskripsi penilaian"
                        className="min-h-[80px] pl-8"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Baris ketiga: Refleksi & Pengayaan + Bahan Bacaan & Glosarium */}
          <div className="grid grid-cols-2 gap-6">
            {/* Refleksi dan Pengayaan */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Refleksi dan Pengayaan</h3>
              <div className="space-y-4">
                {/* Refleksi Guru */}
                <div className="space-y-2">
                  <Label htmlFor="refleksiGuru">Refleksi Guru</Label>
                  <div className="relative">
                    <Edit className="absolute top-3 left-2 h-4 w-4 text-gray-500" />
                    <Textarea
                      id="refleksiGuru"
                      name="refleksiGuru"
                      value={formData.refleksiGuru}
                      onChange={handleInputChange}
                      className="pl-8"
                    />
                  </div>
                </div>
                {/* Refleksi Peserta Didik */}
                <div className="space-y-2">
                  <Label htmlFor="refleksiPesertaDidik">Refleksi Peserta Didik</Label>
                  <div className="relative">
                    <Edit2 className="absolute top-3 left-2 h-4 w-4 text-gray-500" />
                    <Textarea
                      id="refleksiPesertaDidik"
                      name="refleksiPesertaDidik"
                      value={formData.refleksiPesertaDidik}
                      onChange={handleInputChange}
                      className="pl-8"
                    />
                  </div>
                </div>
                {/* Pengayaan & Remedial */}
                <div className="space-y-2">
                  <Label htmlFor="pengayaanRemedial">Pengayaan & Remedial</Label>
                  <div className="relative">
                    <RefreshCcw className="absolute top-3 left-2 h-4 w-4 text-gray-500" />
                    <Textarea
                      id="pengayaanRemedial"
                      name="pengayaanRemedial"
                      value={formData.pengayaanRemedial}
                      onChange={handleInputChange}
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bahan Bacaan dan Glosarium */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Bahan Bacaan dan Glosarium</h3>
              <div className="space-y-4">
                {/* Bahan Bacaan */}
                <div className="space-y-2">
                  <Label htmlFor="bahanBacaan">Bahan Bacaan</Label>
                  <div className="relative">
                    <BookOpen className="absolute top-3 left-2 h-4 w-4 text-gray-500" />
                    <Textarea
                      id="bahanBacaan"
                      name="bahanBacaan"
                      value={formData.bahanBacaan}
                      onChange={handleInputChange}
                      className="pl-8"
                    />
                  </div>
                </div>
                {/* Glosarium */}
                <div className="space-y-2">
                  <Label htmlFor="glosarium">Glosarium</Label>
                  <div className="relative">
                    <BookOpenCheck className="absolute top-3 left-2 h-4 w-4 text-gray-500" />
                    <Textarea
                      id="glosarium"
                      name="glosarium"
                      value={formData.glosarium}
                      onChange={handleInputChange}
                      className="pl-8"
                    />
                  </div>
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
