import { Skeleton } from "@/components/ui/skeleton"

export default function PricingLoading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg p-6 flex flex-col">
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-12 w-1/3 mb-6" />
            <div className="space-y-3 mb-6">
              {[1, 2, 3, 4].map((j) => (
                <Skeleton key={j} className="h-5 w-full" />
              ))}
            </div>
            <Skeleton className="h-10 w-full mt-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}

