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
        {/* Hero Section */}
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

        {/* Promotional Content Section */}
        <section className="relative py-12 bg-white dark:bg-background border-y border-primary/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  At Pacific Global Health, we believe in strong, accessible primary healthcare.
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Our commitment is to ensure that every individual, regardless of background or location, can access timely, affordable, and high-quality care at the community level.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  We design and implement innovative primary care service models that address evolving population needs while remaining patient-centred, equitable, and sustainable. Our focus is on prevention, early diagnosis, and continuity of care—reducing disease burden and improving long-term outcomes.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  By combining global best practices with local solutions, we ensure services are culturally appropriate and tailored to each community. Through partnerships with governments, healthcare providers, and community organisations, we integrate modern technologies, evidence-based practices, and multidisciplinary teamwork.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  We also invest in capacity building, supporting healthcare workers through training and professional development to strengthen frontline care.
                </p>
                <p className="text-lg text-muted-foreground">
                  Through innovation, collaboration, and a deep commitment to community health, Pacific Global Health is building primary healthcare systems that are effective today and sustainable for future generations.
                </p>
              </div>
              <div className="flex-1 hidden md:block">
                <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/homepage-ourstories-healthsystemsdevelopment.jpg"
                    alt="Primary care delivery"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
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
                  src="/images/primarycare.jpg"
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