import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Gratis",
    price: "0",
    features: ["Akses ke fitur dasar", "5 RPP per bulan", "Kolaborasi terbatas"],
  },
  {
    name: "Pro",
    price: "99.000",
    features: ["Semua fitur Gratis", "RPP tidak terbatas", "Kolaborasi penuh", "Analisis kinerja"],
  },
  {
    name: "Sekolah",
    price: "Hubungi kami",
    features: ["Semua fitur Pro", "Manajemen sekolah", "Integrasi dengan sistem sekolah", "Dukungan prioritas"],
  },
]

export default function Pricing() {
  return (
    <section className="bg-gray-100 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Pilihan Harga</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">
                {plan.price === "Hubungi kami" ? (
                  plan.price
                ) : (
                  <>
                    Rp {plan.price}
                    <span className="text-base font-normal">/bulan</span>
                  </>
                )}
              </p>
              <ul className="mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center mb-2">
                    <Check className="text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">{plan.price === "Hubungi kami" ? "Hubungi Kami" : "Pilih Paket"}</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

