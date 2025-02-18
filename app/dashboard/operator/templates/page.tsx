"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle, Trash2, Bold, Italic, Underline } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Add TemplatePreview definition:
interface TemplatePreviewProps {
  namaTemplat: string;
  kelas: string;
  semester: string;
}

function TemplatePreview({ namaTemplat, kelas, semester }: TemplatePreviewProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Preview Template</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <strong>Nama Template:</strong> {namaTemplat || "Belum diisi"}
          </div>
          <div>
            <strong>Kelas:</strong> {kelas || "Belum diisi"}
          </div>
          <div>
            <strong>Semester:</strong> {semester || "Belum dipilih"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Tipe data untuk input
type JenisInput = "text" | "textarea" | "number" | "date" | "select" | "paragraph"

// Tipe data untuk kolom kustom
interface KolomKustom {
  id: string
  label: string
  type: JenisInput
  options?: string[] // Hanya berlaku jika tipe = "select"
  required: boolean
}

// Tipe data untuk setiap bagian (section)
interface Bagian {
  id: string
  title: string
  fields: KolomKustom[]
}

// Komponen utama
export default function Page() {
  // State untuk menyimpan nama templat, kelas, semester, dan daftar bagian
  const [namaTemplat, setNamaTemplat] = useState("")
  const [kelas, setKelas] = useState("")
  const [semester, setSemester] = useState("")

  // State untuk menyimpan struktur RPP (bagian dan kolom)
  const [bagian, setBagian] = useState<Bagian[]>([
    {
      id: "info-dasar",
      title: "Informasi Dasar",
      fields: [
        { id: "nama-guru", label: "Nama Guru", type: "text", required: true },
        { id: "mata-pelajaran", label: "Mata Pelajaran", type: "text", required: true },
      ],
    },
  ])

  /**
   * Menambahkan bagian baru.
   */
  const tambahBagian = () => {
    const bagianBaru: Bagian = {
      id: `bagian-${Date.now()}`,
      title: "Bagian Baru",
      fields: [],
    }
    setBagian((prev) => [...prev, bagianBaru])
  }

  /**
   * Mengubah judul pada suatu bagian.
   *
   * @param idBagian - ID bagian yang ingin diubah
   * @param judulBaru - Judul baru untuk bagian tersebut
   */
  const ubahJudulBagian = (idBagian: string, judulBaru: string) => {
    setBagian((prev) => prev.map((b) => (b.id === idBagian ? { ...b, title: judulBaru } : b)))
  }

  /**
   * Menambahkan kolom baru dalam suatu bagian.
   *
   * @param idBagian - ID bagian tempat kolom akan ditambahkan
   */
  const tambahKolom = (idBagian: string) => {
    const kolomBaru: KolomKustom = {
      id: `kolom-${Date.now()}`,
      label: "Kolom Baru",
      type: "text",
      required: false,
    }

    setBagian((prev) => prev.map((b) => (b.id === idBagian ? { ...b, fields: [...b.fields, kolomBaru] } : b)))
  }

  /**
   * Mengubah properti suatu kolom.
   *
   * @param idBagian - ID bagian
   * @param idKolom - ID kolom
   * @param perubahan - Perubahan yang ingin diterapkan
   */
  const ubahKolom = (idBagian: string, idKolom: string, perubahan: Partial<KolomKustom>) => {
    setBagian((prev) =>
      prev.map((b) =>
        b.id === idBagian
          ? {
            ...b,
            fields: b.fields.map((kolom) => (kolom.id === idKolom ? { ...kolom, ...perubahan } : kolom)),
          }
          : b,
      ),
    )
  }

  /**
   * Menghapus kolom dari suatu bagian.
   *
   * @param idBagian - ID bagian
   * @param idKolom - ID kolom yang akan dihapus
   */
  const hapusKolom = (idBagian: string, idKolom: string) => {
    setBagian((prev) =>
      prev.map((b) =>
        b.id === idBagian
          ? {
            ...b,
            fields: b.fields.filter((kolom) => kolom.id !== idKolom),
          }
          : b,
      ),
    )
  }

  /**
   * Menangani submit form.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Di sinilah Anda bisa mengirim data ke backend atau state global
    console.log("Data RPP:", { namaTemplat, kelas, semester, bagian })

    toast({
      title: "Templat berhasil disimpan",
      description: "Templat RPP kustom Anda telah disimpan dan sekarang tersedia untuk digunakan.",
    })
  }

  // Komponen untuk formatting paragraf
  const ParagraphFormatting = () => (
    <div className="flex space-x-2 mb-2">
      <Button variant="outline" size="icon">
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Italic className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Underline className="h-4 w-4" />
      </Button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Preview section */}
      <TemplatePreview namaTemplat={namaTemplat} kelas={kelas} semester={semester} />

      {/* Bagian untuk pengaturan dasar templat */}
      <Card>
        <CardHeader>
          <CardTitle>Templat RPP Kustom</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="namaTemplat">Nama Templat</Label>
            <Input id="namaTemplat" value={namaTemplat} onChange={(e) => setNamaTemplat(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="kelas">Kelas</Label>
            <Input id="kelas" value={kelas} onChange={(e) => setKelas(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Semester 1</SelectItem>
                <SelectItem value="2">Semester 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bagian-bagian dinamis */}
      {bagian.map((b) => (
        <Card key={b.id}>
          <CardHeader>
            <CardTitle>
              <Input
                value={b.title}
                onChange={(e) => ubahJudulBagian(b.id, e.target.value)}
                className="font-bold text-lg"
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {b.fields.map((kolom) => (
              <div key={kolom.id} className="space-y-2 border-b pb-4">
                <div className="flex items-center space-x-2">
                  {/* Label kolom */}
                  <Input
                    value={kolom.label}
                    onChange={(e) => ubahKolom(b.id, kolom.id, { label: e.target.value })}
                    className="flex-grow"
                  />

                  {/* Pilihan jenis kolom */}
                  <Select
                    value={kolom.type}
                    onValueChange={(value) =>
                      ubahKolom(b.id, kolom.id, {
                        type: value as JenisInput,
                      })
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Pilih tipe kolom" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Teks Singkat</SelectItem>
                      <SelectItem value="textarea">Teks Panjang</SelectItem>
                      <SelectItem value="number">Angka</SelectItem>
                      <SelectItem value="date">Tanggal</SelectItem>
                      <SelectItem value="select">Pilihan (Select)</SelectItem>
                      <SelectItem value="paragraph">Paragraf</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Checkbox 'required' */}
                  <Checkbox
                    checked={kolom.required}
                    onCheckedChange={(checked) =>
                      ubahKolom(b.id, kolom.id, {
                        required: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor={`required-${kolom.id}`} className="whitespace-nowrap">
                    Wajib
                  </Label>

                  {/* Tombol hapus kolom */}
                  <Button type="button" variant="ghost" size="icon" onClick={() => hapusKolom(b.id, kolom.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Add paragraph formatting for textarea and paragraph types */}
                {(kolom.type === "textarea" || kolom.type === "paragraph") && <ParagraphFormatting />}

                {/* Jika tipe "select", tampilkan input untuk opsi */}
                {kolom.type === "select" && (
                  <div className="pl-4">
                    <Label>Opsi (pisahkan dengan koma)</Label>
                    <Input
                      value={kolom.options?.join(", ") || ""}
                      onChange={(e) =>
                        ubahKolom(b.id, kolom.id, {
                          options: e.target.value.split(", "),
                        })
                      }
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Tombol tambah kolom */}
            <Button type="button" variant="outline" onClick={() => tambahKolom(b.id)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah Kolom
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Tombol tambah bagian */}
      <Button type="button" onClick={tambahBagian} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        Tambah Bagian
      </Button>

      {/* Tombol submit */}
      <Button type="submit" className="w-full">
        Simpan Templat
      </Button>
    </form>
  )
}

