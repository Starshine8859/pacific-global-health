import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, BookOpen } from "lucide-react"
import Image from "next/image"

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                Training & Development
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Building Healthcare Capacity
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Developing healthcare workforce capacity through specialized training programs and knowledge transfer
                initiatives.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-96">
                <Image
                  src="/healthcare-training-in-pacific-islands.png"
                  alt="Healthcare training"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Professional Development</h2>
                <p className="text-lg text-muted-foreground mb-6 text-pretty">
                  Our training programs focus on building local capacity and expertise to ensure sustainable healthcare
                  improvements.
                </p>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Skills Development</h3>
                      <p className="text-muted-foreground">Enhancing clinical and administrative capabilities</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Knowledge Transfer</h3>
                      <p className="text-muted-foreground">Sharing best practices and innovations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
