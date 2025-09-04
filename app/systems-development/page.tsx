import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Users, Stethoscope, TrendingUp, BookOpen, Handshake, Globe2 } from "lucide-react"
import Image from "next/image"

export default function SystemsDevelopmentPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                Systems Development
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Building Resilient Health Systems
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                At Pacific Global Health, we believe that resilient health systems are the backbone of healthier, more equitable societies.
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
                  Strengthening the Foundations of Healthcare Delivery
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Our mission is to help countries and communities strengthen the foundations of healthcare delivery by combining innovation, collaboration, and evidence-based practice.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  We recognise that health challenges differ across regions, but the need for strong, sustainable systems is universal. To address this, Pacific Global Health works across several core areas:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>
                    <span className="font-semibold text-foreground">Primary Care Development:</span> Ensuring communities have access to frontline services that are comprehensive, patient-centred, and culturally appropriate.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Health Research & Knowledge Exchange:</span> Generating evidence to inform smarter policies and better resource allocation.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Consultancy & Advisory Services:</span> Our expertise enables governments, NGOs, and private organisations to design, implement, and scale strategies that meet real-world needs.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Human Capital Development:</span> Training and capacity building for healthcare professionals, ensuring systems remain resilient and adaptive into the future.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Resource Mobilisation & Partnerships:</span> Unlocking opportunities for sustainable financing and collaboration.
                  </li>
                </ul>
                <p className="text-lg text-muted-foreground mb-4">
                  Pacific Global Health positions itself as both a think tank and an implementation partner—blending global perspectives with local solutions. By fostering networks, building capacity, and championing innovation, we help create health systems that are stronger, fairer, and better prepared for tomorrow’s challenges.
                </p>
                <p className="text-lg text-muted-foreground">
                  Together with our partners, Pacific Global Health is committed to building a future where quality healthcare is not a privilege but a universal right.
                </p>
              </div>
              <div className="flex-1 hidden md:block">
                <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/health-systems-development.png"
                    alt="Health systems development"
                    fill
                    className="object-cover"
                  />
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