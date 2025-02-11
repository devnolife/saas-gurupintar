/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

// ======================= FAKE DATA =======================
const FAKE_RPP_DATA = [
  {
    title: "Rencana Pelaksanaan Pembelajaran: Matematika Dasar Kelas 2",
    subject: "Matematika",
    grade: "2",
    duration: "2 x 35 Menit",
    identitasModule: `Penyusun: devnolife
Instansi: SDN Harapan
Tahun: 2025
Fase/Kelas: A (Kelas 2)
Volume: Matematika Dasar, Pertemuan 1`,
    kompetensiAwal:
      "Peserta didik mampu mengenal bilangan cacah hingga 100 dan memahami konsep penjumlahan berulang.",
    profilPelajarPancasila:
      "Beriman, Mandiri, Bernalar Kritis, dan Bergotong Royong.",
    saranaPrasarana:
      "Buku Matematika Kelas 2, Kartu Angka, Media Gambar Buah, Papan Tulis.",
    targetPesertaDidik: "Peserta didik kelas 2, sekitar 20-25 anak.",
    modelPembelajaran: "Tatap Muka; Diskusi Kelompok Kecil",

    learningObjectives: [
      "Memahami konsep perkalian sebagai penjumlahan berulang.",
      "Menerapkan perkalian dalam contoh sehari-hari (misal jumlah buah).",
      "Menuliskan kalimat matematika perkalian dengan benar."
    ],
    activities: [
      "Pendahuluan: Guru menyapa siswa, doa bersama, dan menjelaskan topik perkalian (10 menit)",
      "Kegiatan Inti: Siswa mengelompokkan buah-buahan di beberapa piring untuk memahami penjumlahan berulang (20 menit)",
      "Penutup: Refleksi, penguatan konsep, dan pemberian tugas singkat (5 menit)"
    ],
    assessment:
      "Penilaian Sikap: Observasi keterlibatan siswa. Penilaian Pengetahuan: Tes lisan menghitung perkalian sederhana. Penilaian Keterampilan: Mempraktekkan perkalian dengan benda konkret.",
    refleksiGuru:
      "Apakah media yang digunakan sudah efektif? Apakah durasi cukup untuk diskusi kelompok?",
    refleksiPesertaDidik:
      "Apa kesulitan kalian dalam memahami perkalian? Bagian mana yang paling menarik?",
    pengayaanRemedial:
      "Pengayaan: Latihan tambahan perkalian 2-5. Remedial: Bimbingan individu bagi siswa yang belum paham konsep penjumlahan berulang.",
    bahanBacaan:
      "Buku Guru Matematika Kelas 2, Halaman 12-20; Portal Belajar Kemdikbud.",
    glosarium:
      "Perkalian: penjumlahan berulang dari bilangan yang sama sejumlah tertentu."
  },
  {
    title: "Rencana Pelaksanaan Pembelajaran: Matematika Kelas 3 (Pecahan Sederhana)",
    subject: "Matematika",
    grade: "3",
    duration: "2 x 35 Menit",
    identitasModule: `Penyusun: Kelompok Guru Matematika
Instansi: SDN Nusantara
Tahun: 2025
Fase/Kelas: B (Kelas 3)
Volume: Pecahan Sederhana, Pertemuan 1`,
    kompetensiAwal:
      "Peserta didik mampu membagi satu benda atau kumpulan benda menjadi beberapa bagian sama besar.",
    profilPelajarPancasila:
      "Kreatif, Bernalar Kritis, dan Bergotong Royong.",
    saranaPrasarana:
      "Buku Matematika Kelas 3, Kue/Potongan Kertas, Papan Tulis.",
    targetPesertaDidik: "Peserta didik kelas 3, jumlah 20 siswa.",
    modelPembelajaran: "Tatap Muka; Eksperimen dengan alat peraga",
    learningObjectives: [
      "Menjelaskan pengertian pecahan sederhana (1/2, 1/3, 1/4).",
      "Membedakan pecahan yang sama besar dan yang berbeda.",
      "Menunjukkan pecahan pada benda konkret secara tepat."
    ],
    activities: [
      "Pendahuluan: Guru membuka kelas, meninjau materi sebelumnya (5 menit)",
      "Kegiatan Inti: Siswa memotong kertas atau kue menjadi beberapa bagian, memahami makna 1/2, 1/4, dsb. (25 menit)",
      "Penutup: Diskusi hasil percobaan, penugasan kecil (5 menit)"
    ],
    assessment:
      "Penilaian Sikap: Kedisiplinan dan keterlibatan. Penilaian Pengetahuan: Tes singkat pecahan sederhana. Penilaian Keterampilan: Ketepatan memotong kertas.",
    refleksiGuru:
      "Apakah pendekatan praktik membantu siswa memahami pecahan? Apa yang perlu ditingkatkan?",
    refleksiPesertaDidik:
      "Sudah paham perbedaan 1/2, 1/3, 1/4? Ada bagian sulit?",
    pengayaanRemedial:
      "Pengayaan: Tantangan membagi kue menjadi 1/5. Remedial: Pengulangan konsep 1/2, 1/4.",
    bahanBacaan: "Buku Siswa Matematika Kelas 3, Portal Rumah Belajar.",
    glosarium:
      "Pecahan: bagian dari suatu keseluruhan yang terbagi menjadi beberapa bagian sama besar."
  },
  // Anda bisa tambahkan data lain di sini...
]

// ======================= FUNGSI GENERATE RPP =======================
// Di sini kita memadukan input user dengan data palsu
const generateRPP = async (formData: any): Promise<any> => {
  // Simulasi waktu pemrosesan (seolah memanggil API AI)
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // 1. Coba cari data di FAKE_RPP_DATA yang matching subject & grade
  let matched = FAKE_RPP_DATA.find(
    (rpp) =>
      rpp.subject.toLowerCase() === formData.subject.toLowerCase() &&
      rpp.grade === formData.grade
  )

  // 2. Jika tidak ketemu, kita bisa acak (atau pakai item pertama) 
  if (!matched) {
    matched = FAKE_RPP_DATA[Math.floor(Math.random() * FAKE_RPP_DATA.length)]
  }

  // 3. Merge data "matched" dengan form input user
  //    misal kita mau tetap menimpa "duration" dengan isi form 
  //    agar tampak user input memengaruhi output.
  //    Pilih sendiri field mana yang ingin di-override.
  return {
    ...matched,
    // Kita sesuaikan judul agar tampak lebih dinamis
    title: `RPP (Fake AI): ${formData.subject} untuk Kelas ${formData.grade}`,

    subject: formData.subject || matched.subject,
    grade: formData.grade || matched.grade,
    duration: formData.duration || matched.duration,

    identitasModule: formData.identitasModule || matched.identitasModule,
    kompetensiAwal: formData.kompetensiAwal || matched.kompetensiAwal,
    profilPelajarPancasila:
      formData.profilPelajarPancasila || matched.profilPelajarPancasila,
    saranaPrasarana: formData.saranaPrasarana || matched.saranaPrasarana,
    targetPesertaDidik: formData.targetPesertaDidik || matched.targetPesertaDidik,
    modelPembelajaran: formData.modelPembelajaran || matched.modelPembelajaran,

    // Untuk learning objectives, kita gabungkan data existing + input user
    learningObjectives: formData.learningObjectives
      ? formData.learningObjectives.split("\n")
      : matched.learningObjectives,

    // Kegiatan (activities) tetap ambil dari data matched 
    // (atau buatlah logika lain sesuai kebutuhan)
    // assessment, refleksi, dsb. juga sama
    assessment: formData.assessment || matched.assessment,
    refleksiGuru: formData.refleksiGuru || matched.refleksiGuru,
    refleksiPesertaDidik: formData.refleksiPesertaDidik || matched.refleksiPesertaDidik,
    pengayaanRemedial: formData.pengayaanRemedial || matched.pengayaanRemedial,
    bahanBacaan: formData.bahanBacaan || matched.bahanBacaan,
    glosarium: formData.glosarium || matched.glosarium
  }
}

// ======================= KOMPONEN HALAMAN GURU =======================
export default function TeacherDashboardPage() {
  // State untuk form input
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
    glosarium: ""
  })

  // State proses generate
  const [isGenerating, setIsGenerating] = useState(false)
  // State hasil RPP yang di-generate
  const [generatedRPP, setGeneratedRPP] = useState<any>(null)

  // Daftar RPP tersimpan (fake data, seolah-olah RPP lama)
  const [savedRPPList] = useState(FAKE_RPP_DATA)

  // Handle input (text, textarea)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select (kelas)
  const handleSelectChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Submit form
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
    <div className="max-w-[1200px] mx-auto">
      <div className="grid grid-cols-12 gap-6">
        {/* FORM UNTUK INPUT RPP */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <CardHeader>
              <CardTitle>Buat RPP Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Subject & Grade */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Mata Pelajaran</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Kelas</Label>
                    <Select
                      value={formData.grade}
                      onValueChange={(value) => handleSelectChange(value, "grade")}
                    >
                      <SelectTrigger>
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
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    placeholder="Misal: 2x35 menit"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="identitasModule">Identitas Modul</Label>
                  <Textarea
                    id="identitasModule"
                    name="identitasModule"
                    value={formData.identitasModule}
                    onChange={handleInputChange}
                    placeholder="Penyusun, Instansi, Fase/Kelas, dsb."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kompetensiAwal">Kompetensi Awal</Label>
                  <Textarea
                    id="kompetensiAwal"
                    name="kompetensiAwal"
                    value={formData.kompetensiAwal}
                    onChange={handleInputChange}
                    placeholder="Kemampuan awal siswa..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profilPelajarPancasila">Profil Pelajar Pancasila</Label>
                  <Textarea
                    id="profilPelajarPancasila"
                    name="profilPelajarPancasila"
                    value={formData.profilPelajarPancasila}
                    onChange={handleInputChange}
                    placeholder="Beriman, Mandiri, dsb."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="saranaPrasarana">Sarana & Prasarana</Label>
                  <Textarea
                    id="saranaPrasarana"
                    name="saranaPrasarana"
                    value={formData.saranaPrasarana}
                    onChange={handleInputChange}
                    placeholder="Buku, papan tulis, media konkret..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetPesertaDidik">Target Peserta Didik</Label>
                  <Textarea
                    id="targetPesertaDidik"
                    name="targetPesertaDidik"
                    value={formData.targetPesertaDidik}
                    onChange={handleInputChange}
                    placeholder="Misal: Peserta didik reguler 20 siswa"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modelPembelajaran">Model Pembelajaran</Label>
                  <Textarea
                    id="modelPembelajaran"
                    name="modelPembelajaran"
                    value={formData.modelPembelajaran}
                    onChange={handleInputChange}
                    placeholder="Tatap muka, diskusi kelompok, dsb."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="learningObjectives">Tujuan Pembelajaran</Label>
                  <Textarea
                    id="learningObjectives"
                    name="learningObjectives"
                    value={formData.learningObjectives}
                    onChange={handleInputChange}
                    placeholder="Pisahkan dengan baris baru"
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assessment">Penilaian (Assessment)</Label>
                  <Textarea
                    id="assessment"
                    name="assessment"
                    value={formData.assessment}
                    onChange={handleInputChange}
                    placeholder="Deskripsi penilaian"
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refleksiGuru">Refleksi Guru</Label>
                  <Textarea
                    id="refleksiGuru"
                    name="refleksiGuru"
                    value={formData.refleksiGuru}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refleksiPesertaDidik">Refleksi Peserta Didik</Label>
                  <Textarea
                    id="refleksiPesertaDidik"
                    name="refleksiPesertaDidik"
                    value={formData.refleksiPesertaDidik}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pengayaanRemedial">Pengayaan & Remedial</Label>
                  <Textarea
                    id="pengayaanRemedial"
                    name="pengayaanRemedial"
                    value={formData.pengayaanRemedial}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bahanBacaan">Bahan Bacaan</Label>
                  <Textarea
                    id="bahanBacaan"
                    name="bahanBacaan"
                    value={formData.bahanBacaan}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="glosarium">Glosarium</Label>
                  <Textarea
                    id="glosarium"
                    name="glosarium"
                    value={formData.glosarium}
                    onChange={handleInputChange}
                  />
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
        </div>

        {/* BAGIAN PREVIEW RPP DAN DAFTAR RPP TERSIMPAN */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
          {/* Preview RPP baru */}
          <Card>
            <CardHeader>
             
            </CardHeader>
            <CardContent>
              {generatedRPP ? (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">{generatedRPP.title}</h2>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="font-semibold">Mata Pelajaran:</p>
                      <p>{generatedRPP.subject}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Kelas:</p>
                      <p>{generatedRPP.grade}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Durasi:</p>
                      <p>{generatedRPP.duration}</p>
                    </div>
                  </div>

                  <p>
                    <strong>Identitas Modul:</strong> <br />
                    {generatedRPP.identitasModule || "-"}
                  </p>
                  <p>
                    <strong>Kompetensi Awal:</strong> <br />
                    {generatedRPP.kompetensiAwal || "-"}
                  </p>
                  <p>
                    <strong>Profil Pelajar Pancasila:</strong> <br />
                    {generatedRPP.profilPelajarPancasila || "-"}
                  </p>
                  <p>
                    <strong>Sarana & Prasarana:</strong> <br />
                    {generatedRPP.saranaPrasarana || "-"}
                  </p>
                  <p>
                    <strong>Target Peserta Didik:</strong> <br />
                    {generatedRPP.targetPesertaDidik || "-"}
                  </p>
                  <p>
                    <strong>Model Pembelajaran:</strong> <br />
                    {generatedRPP.modelPembelajaran || "-"}
                  </p>

                  <div>
                    <strong>Tujuan Pembelajaran:</strong>
                    <ul className="list-disc pl-5">
                      {generatedRPP.learningObjectives.map((obj: string, idx: number) => (
                        <li key={idx}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <strong>Kegiatan Pembelajaran:</strong>
                    <ol className="list-decimal pl-5">
                      {generatedRPP.activities.map((act: string, i: number) => (
                        <li key={i}>{act}</li>
                      ))}
                    </ol>
                  </div>

                  <p>
                    <strong>Penilaian (Assessment):</strong> <br />
                    {generatedRPP.assessment}
                  </p>
                  <p>
                    <strong>Refleksi Guru:</strong> <br />
                    {generatedRPP.refleksiGuru || "-"}
                  </p>
                  <p>
                    <strong>Refleksi Peserta Didik:</strong> <br />
                    {generatedRPP.refleksiPesertaDidik || "-"}
                  </p>
                  <p>
                    <strong>Pengayaan & Remedial:</strong> <br />
                    {generatedRPP.pengayaanRemedial || "-"}
                  </p>
                  <p>
                    <strong>Bahan Bacaan:</strong> <br />
                    {generatedRPP.bahanBacaan || "-"}
                  </p>
                  <p>
                    <strong>Glosarium:</strong> <br />
                    {generatedRPP.glosarium || "-"}
                  </p>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  RPP akan ditampilkan di sini setelah di-generate
                </p>
              )}
            </CardContent>
          </Card>

          {/* Daftar RPP Tersimpan (fake data) */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar RPP Tersimpan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {savedRPPList.map((rpp, index) => (
                <div key={index} className="border p-4 rounded">
                  <h3 className="font-bold text-lg mb-2">{rpp.title}</h3>
                  <p>
                    <span className="font-semibold">Mata Pelajaran:</span> {rpp.subject} <br />
                    <span className="font-semibold">Kelas:</span> {rpp.grade} <br />
                    <span className="font-semibold">Durasi:</span> {rpp.duration}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold">Kompetensi Awal:</span> <br />
                    {rpp.kompetensiAwal}
                  </p>
                  {/* Bisa tambahkan field lain sesuai kebutuhan */}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
