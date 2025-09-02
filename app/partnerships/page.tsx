import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Building2, Users } from "lucide-react"
import Image from "next/image"

export default function PartnershipsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                Global Partnerships
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Building Strategic Alliances
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Creating meaningful partnerships with governments, organizations, and communities to strengthen health
                systems across the Asia-Pacific region.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-96">
                <Image
                  src="/healthcare-partnership-meeting.png"
                  alt="Partnership meeting"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Collaborative Impact</h2>
                <p className="text-lg text-muted-foreground mb-6 text-pretty">
                  Our partnerships span across government agencies, healthcare organizations, academic institutions, and
                  community groups, creating a comprehensive network for health system improvement.
                </p>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Government Collaboration</h3>
                      <p className="text-muted-foreground">Working with health ministries and policy makers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Community Engagement</h3>
                      <p className="text-muted-foreground">Partnering with local communities and leaders</p>
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
