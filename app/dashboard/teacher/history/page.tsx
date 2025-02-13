import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FAKE_RPP_DATA } from "@/app/data/fakeRPPData"

export default function LessonPlanHistoryPage() {
  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Lesson Plan History</h1>
      <Card>
        <CardHeader>
          <CardTitle>Saved Lesson Plans</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {FAKE_RPP_DATA.map((rpp, index) => (
            <div key={index} className="border p-4 rounded">
              <h3 className="font-bold text-lg mb-2">{rpp.title}</h3>
              <p>
                <span className="font-semibold">Subject:</span> {rpp.subject} <br />
                <span className="font-semibold">Grade:</span> {rpp.grade} <br />
                <span className="font-semibold">Duration:</span> {rpp.duration}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Initial Competency:</span> <br />
                {rpp.kompetensiAwal}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

