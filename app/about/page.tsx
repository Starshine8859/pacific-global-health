import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Target, Users, Award } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
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
      description: "We are committed to the highest standards of healthcare delivery and continuous improvement.",
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
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                About Pacific Global Health
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                A global think tank dedicated to building comprehensive health system improvement knowledge and
                delivering innovative, sustainable healthcare solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6 text-pretty">
                  To strengthen health systems across the Asia-Pacific region through innovative solutions, strategic
                  partnerships, and evidence-based approaches that improve healthcare access, quality, and outcomes for
                  all communities.
                </p>
                <p className="text-lg text-muted-foreground text-pretty">
                  We serve as a comprehensive knowledge base and global think tank, bringing together expertise from
                  diverse fields to address complex health challenges and create sustainable improvements in healthcare
                  delivery.
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
                    src="/professional-headshot-of-dr--sathira-perera.png"
                    alt="Dr. Sathira Perera"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Dr. Sathira Perera</h3>
                    <p className="text-lg text-primary font-medium">Founder & Chief Executive</p>
                    <Badge variant="outline" className="mt-2">
                      MBBS, FRACGP, MPH
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-pretty">
                    Dr. Perera brings extensive experience in primary care, public health, and health systems
                    development. With qualifications in medicine, general practice, and public health, he has dedicated
                    his career to improving healthcare access and quality across diverse communities.
                  </p>
                  <p className="text-muted-foreground text-pretty">
                    His vision for Pacific Global Health stems from years of frontline healthcare experience and a deep
                    understanding of the systemic challenges facing health systems in the Asia-Pacific region.
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
