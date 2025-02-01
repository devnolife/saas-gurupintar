import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="w-full bg-blue-600 py-12 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Mulai Perjalanan Anda dengan Guru Pintar Hari Ini
        </h2>
        <p className="text-xl text-white mb-8">
          Bergabunglah dengan ribuan guru yang mempercayakan Guru Pintar untuk perencanaan pembelajaran yang lebih
          cerdas.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300">
            Mulai Uji Coba Gratis
          </Button>
          <Button
            variant="outline"
            className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300"
          >
            Pelajari Lebih Lanjut
          </Button>
        </div>
      </div>
    </section>
  )
}

