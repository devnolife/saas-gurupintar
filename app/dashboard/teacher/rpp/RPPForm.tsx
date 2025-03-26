"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useRppMutation } from "@/hooks/useRppMutation"
import { ApolloProvider } from "@apollo/client"
import { client } from "@/lib/api/graphql/client"

// Define the form data type
type RPPFormData = {
  satuanPendidikan: string
  mataPelajaran: string
  topik: string
  kelas: string
  jenjangPendidikan: "SD" | "SMP" | "SMA" | "SMK"
  fase: "A" | "B" | "C" | "D" | "E"
  cakupanMateri: string
  alokasi_waktu: string
  tujuanPembelajaran: string[]
  profilPelajarPancasila: string[]
  kompetensiAwal: string
  modelPembelajaran: string
  sumberBelajar: string[]
  mediaDigital: string[]
  metodePembelajaran: string[]
}

export default function RPPFormWrapper() {
  return (
    <ApolloProvider client={client}>
      <RPPForm />
    </ApolloProvider>
  )
}

function RPPForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RPPFormData>()
  const [step, setStep] = useState(1)
  const { toast } = useToast()
  const { createRpp, loading } = useRppMutation()
  const [isGenerating, setIsGenerating] = useState(false)

  const onSubmit = async (data: RPPFormData) => {
    try {
      setIsGenerating(true)

      // Process arrays from comma-separated strings
      const processedData = {
        ...data,
        tujuanPembelajaran: data.tujuanPembelajaran || [],
        profilPelajarPancasila: data.profilPelajarPancasila || [],
        sumberBelajar: data.sumberBelajar || [],
        mediaDigital: data.mediaDigital || [],
        metodePembelajaran: data.metodePembelajaran || [],
      }

      // Call the GraphQL mutation
      const result = await createRpp(processedData)

      toast({
        title: "RPP berhasil dibuat!",
        description: "RPP telah berhasil dibuat dan disimpan.",
      })

      // Navigate to preview page with the created RPP ID
      window.location.href = `/dashboard/teacher/rpp/preview/${result.id}`
    } catch (error) {
      console.error("Error creating RPP:", error)
      toast({
        title: "Gagal membuat RPP",
        description: "Terjadi kesalahan saat membuat RPP. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {step === 1 && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">Informasi Dasar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="satuanPendidikan">Satuan Pendidikan</Label>
                <Input
                  id="satuanPendidikan"
                  {...register("satuanPendidikan", { required: "Satuan Pendidikan wajib diisi" })}
                  placeholder="Contoh: SD N II Inpres"
                />
                {errors.satuanPendidikan && <p className="text-red-500 text-sm">{errors.satuanPendidikan.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mataPelajaran">Mata Pelajaran</Label>
                <Input
                  id="mataPelajaran"
                  {...register("mataPelajaran", { required: "Mata Pelajaran wajib diisi" })}
                  placeholder="Contoh: Matematika"
                />
                {errors.mataPelajaran && <p className="text-red-500 text-sm">{errors.mataPelajaran.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="topik">Topik</Label>
                <Input
                  id="topik"
                  {...register("topik", { required: "Topik wajib diisi" })}
                  placeholder="Contoh: Angka"
                />
                {errors.topik && <p className="text-red-500 text-sm">{errors.topik.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="kelas">Kelas</Label>
                <Input id="kelas" {...register("kelas", { required: "Kelas wajib diisi" })} placeholder="Contoh: II" />
                {errors.kelas && <p className="text-red-500 text-sm">{errors.kelas.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="jenjangPendidikan">Jenjang Pendidikan</Label>
                <Select onValueChange={(value) => register("jenjangPendidikan").onChange({ target: { value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jenjang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SD">SD</SelectItem>
                    <SelectItem value="SMP">SMP</SelectItem>
                    <SelectItem value="SMA">SMA</SelectItem>
                    <SelectItem value="SMK">SMK</SelectItem>
                  </SelectContent>
                </Select>
                {errors.jenjangPendidikan && <p className="text-red-500 text-sm">{errors.jenjangPendidikan.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fase">Fase</Label>
                <Select onValueChange={(value) => register("fase").onChange({ target: { value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Fase" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                    <SelectItem value="E">E</SelectItem>
                  </SelectContent>
                </Select>
                {errors.fase && <p className="text-red-500 text-sm">{errors.fase.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cakupanMateri">Cakupan Materi</Label>
                <Input
                  id="cakupanMateri"
                  {...register("cakupanMateri", { required: "Cakupan Materi wajib diisi" })}
                  placeholder="Contoh: Mengenal Angka 0 sampai 9"
                />
                {errors.cakupanMateri && <p className="text-red-500 text-sm">{errors.cakupanMateri.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="alokasi_waktu">Alokasi Waktu</Label>
                <Input
                  id="alokasi_waktu"
                  {...register("alokasi_waktu", { required: "Alokasi Waktu wajib diisi" })}
                  placeholder="Contoh: 2 x 40 menit"
                />
                {errors.alokasi_waktu && <p className="text-red-500 text-sm">{errors.alokasi_waktu.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">Kompetensi dan Tujuan</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tujuanPembelajaran">Tujuan Pembelajaran</Label>
                <Textarea
                  id="tujuanPembelajaran"
                  {...register("tujuanPembelajaran")}
                  placeholder="Masukkan tujuan pembelajaran (pisahkan dengan koma)"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profilPelajarPancasila">Profil Pelajar Pancasila</Label>
                <Textarea
                  id="profilPelajarPancasila"
                  {...register("profilPelajarPancasila")}
                  placeholder="Masukkan profil pelajar pancasila (pisahkan dengan koma)"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kompetensiAwal">Kompetensi Awal</Label>
                <Textarea
                  id="kompetensiAwal"
                  {...register("kompetensiAwal")}
                  placeholder="Masukkan kompetensi awal siswa"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modelPembelajaran">Model Pembelajaran</Label>
                <Input
                  id="modelPembelajaran"
                  {...register("modelPembelajaran")}
                  placeholder="Contoh: Discovery Learning"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">Sumber dan Media</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sumberBelajar">Sumber Belajar</Label>
                <Textarea
                  id="sumberBelajar"
                  {...register("sumberBelajar")}
                  placeholder="Masukkan sumber belajar (pisahkan dengan koma)"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mediaDigital">Media Digital</Label>
                <Textarea
                  id="mediaDigital"
                  {...register("mediaDigital")}
                  placeholder="Masukkan media digital (pisahkan dengan koma)"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metodePembelajaran">Metode Pembelajaran</Label>
                <Textarea
                  id="metodePembelajaran"
                  {...register("metodePembelajaran")}
                  placeholder="Masukkan metode pembelajaran (pisahkan dengan koma)"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        {step > 1 && (
          <Button type="button" onClick={prevStep} variant="outline">
            Sebelumnya
          </Button>
        )}

        {step < 3 ? (
          <Button type="button" onClick={nextStep} className="ml-auto">
            Selanjutnya
          </Button>
        ) : (
          <Button type="submit" disabled={isGenerating || loading} className="ml-auto">
            {isGenerating ? "Membuat RPP..." : "Buat RPP"}
          </Button>
        )}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>
    </form>
  )
}

