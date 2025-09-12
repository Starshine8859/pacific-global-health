import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Target, Users, Award, HeartPulse, BookOpen, Briefcase, GraduationCap, Handshake } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const focusAreas = [
    {
      icon: HeartPulse,
      title: "Primary Care",
      description:
        "Strengthening the foundation of health systems by supporting accessible, patient-centred, and community-driven healthcare.",
    },
    {
      icon: BookOpen,
      title: "Health Research",
      description:
        "Building a robust knowledge base through rigorous studies, data analysis, and dissemination of evidence that informs policy and practice.",
    },
    {
      icon: Briefcase,
      title: "Consultancy Services",
      description:
        "Offering tailored advice and solutions for governments, NGOs, and private sector partners to design, evaluate, and scale effective health interventions.",
    },
    {
      icon: GraduationCap,
      title: "Human Capital Development",
      description:
        "Investing in healthcare professionals through education, training, and leadership development, ensuring sustainable capacity for the future.",
    },
    {
      icon: Handshake,
      title: "Resource Mobilisation",
      description:
        "Facilitating partnerships, funding strategies, and innovative financing models to expand the reach and impact of healthcare initiatives.",
    },
  ]

  const values = [
    {
      icon: Globe,
      title: "Global Perspective",
      description:
        "We bring international expertise and best practices to address local health challenges across the Asia-Pacific region.",
    },
    {
      icon: Target,
      title: "Evidence-Based Solutions",
      description:
        "Our approaches are grounded in rigorous research and proven methodologies that deliver measurable outcomes.",
    },
    {
      icon: Users,
      title: "Collaborative Partnerships",
      description:
        "We work closely with local communities, governments, and organizations to ensure sustainable impact.",
    },
    {
      icon: Award,
      title: "Excellence in Care",
      description:
        "We are committed to the highest standards of healthcare delivery and continuous improvement.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              About Pacific Global Health
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Pacific Global Health endeavours to build a comprehensive health system improvement knowledge base and serve as a global think tank for innovative, sustainable solutions in healthcare.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 text-pretty">
                Our mission is to bridge the gap between knowledge and practice, creating practical pathways that strengthen health systems and improve outcomes for communities across the Asia-Pacific region and beyond.
              </p>
              <p className="text-lg text-muted-foreground text-pretty">
                We believe that healthcare challenges are complex and multi-dimensional, requiring a holistic and collaborative approach. That is why Pacific Global Health operates across multiple dimensions of the healthcare system to deliver meaningful improvement.
              </p>
            </div>
            <div className="relative h-96">
              <Image
                src="/healthcare-worker-with-patient-in-asia-pacific-reg.png"
                alt="Healthcare mission"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Focus Areas */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Key Areas of Focus</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                From frontline care to strategic consultancy, our work integrates expertise, evidence, and action.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {focusAreas.map((area, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <area.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-xl">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{area.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Approach</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              At Pacific Global Health, we combine global expertise with local insights. By acting as a hub of knowledge exchange, we connect policymakers, practitioners, researchers, and communities to co-create solutions that are contextually relevant and globally informed.
            </p>
            <p className="text-lg text-muted-foreground text-pretty mt-6">
              We are not just about identifying problems; we are about driving implementation, monitoring impact, and adapting strategies to ensure continuous improvement.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                The principles that guide our work and define our commitment to healthcare excellence.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why We Exist */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Why We Exist</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              The world is facing increasing health challenges—rising chronic disease, inequities in care, workforce shortages, and pressures on financing. At the same time, health systems development consultations have become unaffordable to most resource-poor settings.
            </p>
            <p className="text-lg text-muted-foreground text-pretty mt-6">
              Pacific Global Health responds by positioning itself as both a thought leader and a practical partner. We exist to shape a future where healthcare systems are resilient, equitable, and equipped to meet the needs of all people.
            </p>
            <p className="text-lg text-muted-foreground text-pretty mt-6">
              Through collaboration, innovation, and commitment to excellence, Pacific Global Health is working to transform vision into action and action into healthier futures for generations to come.
            </p>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Leadership</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Our leadership brings decades of experience in healthcare, policy, and international development.
              </p>
            </div>
            <Card className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 p-8">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src="/IMG_9276.jpeg"
                    alt="Dr. Sathira Perera"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Dr. Sathira Perera</h3>
                    <p className="text-lg text-primary font-medium">Founder and Director of Pacific Global Health</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="outline">MBBS (Hons)</Badge>
                      <Badge variant="outline">Master of Community Medicine</Badge>
                      <Badge variant="outline">Master of Health Economics & Policy</Badge>
                      <Badge variant="outline">PhD Health Systems Research: Cancer Therapy (UNSW)</Badge>
                    </div>
                  </div>
                  {/* <p className="text-muted-foreground text-pretty">
                    Dr. Perera brings extensive experience in primary care, public health, and health systems development. With qualifications in medicine, community medicine, health economics & policy, and a PhD in Health Systems Research (Cancer Therapy) from UNSW, he has dedicated his career to improving healthcare access and quality across diverse communities.
                  </p> */}
                  <p className="text-muted-foreground text-pretty">
                  Dr Sathira Perera, Founder and Director of Pacific Global Health, is a primary care physician and health systems specialist whose interdisciplinary expertise in medicine, public health, health economics and policy drives his commitment to advancing equitable, evidence-based healthcare locally and globally.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
