import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Building2, GraduationCap, Search } from "lucide-react"
import Image from "next/image"

export default function WorkPage() {
  const workAreas = [
    {
      icon: Heart,
      title: "Primary Care Excellence",
      description:
        "Strengthening primary healthcare delivery systems across the Asia-Pacific region through innovative care models and community-based approaches.",
      image: "/healthcare-worker-with-patient-in-asia-pacific-reg.png",
      impact: "50+ communities served",
      status: "Active",
    },
    {
      icon: Users,
      title: "Global Partnerships",
      description:
        "Building strategic alliances with governments, NGOs, and healthcare organizations to create sustainable health system improvements.",
      image: "/healthcare-partnership-meeting.png",
      impact: "15+ partner organizations",
      status: "Expanding",
    },
    {
      icon: Building2,
      title: "Systems Development",
      description:
        "Designing and implementing comprehensive health system frameworks that address infrastructure, policy, and operational challenges.",
      image: "/children-receiving-healthcare-in-asia-pacific.png",
      impact: "8 health systems improved",
      status: "Ongoing",
    },
    {
      icon: GraduationCap,
      title: "Training & Development",
      description:
        "Developing healthcare workforce capacity through specialized training programs and knowledge transfer initiatives.",
      image: "/healthcare-training-in-pacific-islands.png",
      impact: "500+ professionals trained",
      status: "Active",
    },
    {
      icon: Search,
      title: "Research & Innovation",
      description:
        "Conducting evidence-based research to inform policy decisions and develop innovative solutions for complex health challenges.",
      image: "/health-systems-research.png",
      impact: "25+ research projects",
      status: "Active",
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
                Our Work Across the Asia-Pacific
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Transforming healthcare systems through innovative solutions, strategic partnerships, and evidence-based
                approaches that create lasting impact in communities across the region.
              </p>
            </div>
          </div>
        </section>

        {/* Work Areas */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8">
              {workAreas.map((area, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-auto">
                      <Image src={area.image || "/placeholder.svg"} alt={area.title} fill className="object-cover" />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <CardHeader className="p-0 mb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <area.icon className="h-8 w-8 text-primary" />
                          <Badge variant="secondary">{area.status}</Badge>
                        </div>
                        <CardTitle className="text-2xl">{area.title}</CardTitle>
                        <CardDescription className="text-base">{area.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                          <Heart className="h-4 w-4" />
                          <span>{area.impact}</span>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
