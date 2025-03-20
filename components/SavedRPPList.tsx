"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Printer, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { toast } from "@/hooks/use-toast"

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

interface SavedRPPListProps {
  savedRPPList?: any[]
}

export function SavedRPPList({ savedRPPList = sampleSavedRPPs }: SavedRPPListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [processingItem, setProcessingItem] = useState<string | null>(null)

  const filteredRPPs = savedRPPList.filter(
    (rpp) =>
      rpp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rpp.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rpp.grade.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePrint = (rppId: string) => {
    setProcessingItem(rppId)

    // Simulate print preparation
    setTimeout(() => {
      toast({
        title: "Print prepared",
        description: "Your lesson plan is ready to print. Opening print dialog...",
      })

      // In a real implementation, you would prepare the document for printing
      // and then call window.print()
      window.print()
      setProcessingItem(null)
    }, 1500)
  }

  const handleExportWord = (rppId: string) => {
    setProcessingItem(rppId)

    // Simulate Word document generation
    setTimeout(() => {
      toast({
        title: "Word document generated",
        description: "Your lesson plan has been exported as a Word document.",
      })

      // In a real implementation, you would generate a Word document
      // and trigger a download

      // Simulate download with a fake blob
      const blob = new Blob(["Fake Word document content"], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `lesson-plan-${rppId}.docx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setProcessingItem(null)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Daftar RPP Tersimpan</CardTitle>
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search lesson plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredRPPs.length > 0 ? (
          filteredRPPs.map((rpp, index) => (
            <motion.div
              key={rpp.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border p-4 rounded-lg hover:shadow-md transition-all duration-300 bg-card"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-primary">{rpp.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <p>
                      <span className="font-semibold">Mata Pelajaran:</span> {rpp.subject}
                    </p>
                    <p>
                      <span className="font-semibold">Kelas:</span> {rpp.grade}
                    </p>
                    <p>
                      <span className="font-semibold">Durasi:</span> {rpp.duration}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Kompetensi Awal:</span> {rpp.kompetensiAwal}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Created: {new Date(rpp.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-row md:flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => handlePrint(rpp.id)}
                    disabled={processingItem === rpp.id}
                  >
                    <Printer className="h-4 w-4" />
                    {processingItem === rpp.id ? "Preparing..." : "Print"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => handleExportWord(rpp.id)}
                    disabled={processingItem === rpp.id}
                  >
                    <FileText className="h-4 w-4" />
                    {processingItem === rpp.id ? "Exporting..." : "Word"}
                  </Button>
                  <Button variant="default" size="sm" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Open
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-medium">No lesson plans found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {searchTerm ? "Try a different search term" : "Create your first lesson plan to get started"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

