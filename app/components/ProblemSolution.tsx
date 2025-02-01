import Image from "next/image"

export default function ProblemSolution() {
  return (
    <section className="w-full bg-gray-50 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Lesson Planning Made Easy</h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h3 className="text-2xl font-semibold mb-4">Before Guru Pintar</h3>
            <p className="text-gray-600 mb-4">Hours spent creating plans, juggling formats, and meeting standards.</p>
            <Image
              src="/placeholder.svg"
              alt="Frustrated teacher before using Guru Pintar"
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">After Guru Pintar</h3>
            <p className="text-gray-600 mb-4">Quick, easy, and compliant lesson plans in minutes.</p>
            <Image
              src="/placeholder.svg"
              alt="Confident teacher after using Guru Pintar"
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

