import { Button } from "@/components/ui/button"

export function LeadershipSection() {
  return (
    <section className="py-20 lg:py-32 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-5xl font-bold text-balance leading-tight">
              Become a<span className="text-primary"> regular partner</span> and strengthen health systems today
            </h2>

            <p className="text-xl text-gray-300 text-pretty leading-relaxed">
              Your regular partnership can help to make sure the world's most vulnerable healthcare systems have access
              to quality care, won't go without essential services or miss out on life-saving interventions.
            </p>

            <div className="pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg">
                PARTNER NOW
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src="/healthcare-worker-with-patient-in-asia-pacific-reg.png"
                alt="Healthcare partnership"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
