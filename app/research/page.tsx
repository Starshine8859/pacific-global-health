import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Search, BarChart } from "lucide-react"
import Image from "next/image"

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                Research
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Evidence-Based Solutions
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Conducting rigorous research to inform policy decisions and develop innovative solutions for complex
                health challenges.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Research Focus</h2>
                <p className="text-lg text-muted-foreground mb-6 text-pretty">
                  Our research initiatives focus on generating evidence that drives meaningful improvements in health
                  system performance and outcomes.
                </p>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <Search className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Health Systems Research</h3>
                      <p className="text-muted-foreground">Analyzing system performance and effectiveness</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BarChart className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Impact Assessment</h3>
                      <p className="text-muted-foreground">Measuring outcomes and program effectiveness</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-96">
                <Image
                  src="/health-systems-research.png"
                  alt="Health research"
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
