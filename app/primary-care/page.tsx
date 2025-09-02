import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Users, Stethoscope, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function PrimaryCarePage() {
  const services = [
    {
      icon: Stethoscope,
      title: "Clinical Excellence",
      description: "Implementing evidence-based clinical protocols and quality improvement initiatives.",
    },
    {
      icon: Users,
      title: "Community Health",
      description: "Developing community-centered care models that address local health needs.",
    },
    {
      icon: TrendingUp,
      title: "System Integration",
      description: "Creating seamless connections between primary care and specialist services.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                Primary Care
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Strengthening Primary Healthcare
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Building robust primary care systems that serve as the foundation for comprehensive healthcare delivery
                across the Asia-Pacific region.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Approach</h2>
                <p className="text-lg text-muted-foreground mb-6 text-pretty">
                  We focus on developing comprehensive primary care systems that are accessible, affordable, and
                  culturally appropriate for diverse communities across the Asia-Pacific region.
                </p>
                <div className="grid gap-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <service.icon className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground">{service.title}</h3>
                        <p className="text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-96">
                <Image
                  src="/healthcare-worker-with-patient-in-asia-pacific-reg.png"
                  alt="Primary care delivery"
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
