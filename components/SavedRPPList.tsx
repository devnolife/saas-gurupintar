import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SavedRPPListProps {
  savedRPPList: any[]
}

export function SavedRPPList({ savedRPPList }: SavedRPPListProps) {
  return (
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
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

