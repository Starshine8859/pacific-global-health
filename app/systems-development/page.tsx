import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Settings, Network } from "lucide-react"
import Image from "next/image"

export default function SystemsDevelopmentPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                Systems Development
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Health System Architecture
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Designing and implementing comprehensive health system frameworks that address infrastructure, policy,
                and operational challenges.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">System Design</h2>
                <p className="text-lg text-muted-foreground mb-6 text-pretty">
                  We develop integrated health system solutions that improve efficiency, quality, and accessibility of
                  healthcare services.
                </p>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <Settings className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Process Optimization</h3>
                      <p className="text-muted-foreground">Streamlining healthcare delivery workflows</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Network className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">System Integration</h3>
                      <p className="text-muted-foreground">Connecting healthcare components seamlessly</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-96">
                <Image
                  src="/children-receiving-healthcare-in-asia-pacific.png"
                  alt="Health systems"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
