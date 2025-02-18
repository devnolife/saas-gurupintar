import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface RPPGenerated {
  title: string;
  subject: string;
  grade: string;
  duration: string;
  identitasModule: string;
  kompetensiAwal: string;
  profilPelajarPancasila: string;
  saranaPrasarana: string;
  targetPesertaDidik: string;
  modelPembelajaran: string;
  learningObjectives: string[];
  activities: string[];
  assessment: string;
  refleksiGuru: string;
  refleksiPesertaDidik: string;
  pengayaanRemedial: string;
  bahanBacaan: string;
  glosarium: string;
}

interface RPPPreviewProps {
  generatedRPP: RPPGenerated;
  isGenerating: boolean;
}

export function RPPPreview({ generatedRPP, isGenerating }: RPPPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview RPP</CardTitle>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <RPPSkeleton />
        ) : generatedRPP ? (
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

            <RPPSection title="Identitas Modul" content={generatedRPP.identitasModule} />
            <RPPSection title="Kompetensi Awal" content={generatedRPP.kompetensiAwal} />
            <RPPSection title="Profil Pelajar Pancasila" content={generatedRPP.profilPelajarPancasila} />
            <RPPSection title="Sarana & Prasarana" content={generatedRPP.saranaPrasarana} />
            <RPPSection title="Target Peserta Didik" content={generatedRPP.targetPesertaDidik} />
            <RPPSection title="Model Pembelajaran" content={generatedRPP.modelPembelajaran} />

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

            <RPPSection title="Penilaian (Assessment)" content={generatedRPP.assessment} />
            <RPPSection title="Refleksi Guru" content={generatedRPP.refleksiGuru} />
            <RPPSection title="Refleksi Peserta Didik" content={generatedRPP.refleksiPesertaDidik} />
            <RPPSection title="Pengayaan & Remedial" content={generatedRPP.pengayaanRemedial} />
            <RPPSection title="Bahan Bacaan" content={generatedRPP.bahanBacaan} />
            <RPPSection title="Glosarium" content={generatedRPP.glosarium} />
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-4">
            <p>RPP belum di-generate.</p>
            <p>Isi formulir di sebelah kiri dan klik &quot;Generate RPP&quot; untuk melihat hasilnya di sini.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function RPPSection({ title, content }: { title: string; content: string }) {
  return (
    <p>
      <strong>{title}:</strong> <br />
      {content || "-"}
    </p>
  )
}

function RPPSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      {[...Array(10)].map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  )
}

