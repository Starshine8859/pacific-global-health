import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HandHeart, Users, Building2, GraduationCap, Mail, ArrowRight } from "lucide-react"

export default function InvolvedPage() {
  const opportunities = [
    {
      icon: HandHeart,
      title: "Healthcare Professionals",
      description:
        "Join our network of healthcare professionals contributing expertise to improve health systems across the Asia-Pacific region.",
      commitment: "Flexible engagement",
      type: "Professional Network",
      action: "Apply to Join",
    },
    {
      icon: Building2,
      title: "Institutional Partnerships",
      description:
        "Partner with us as a healthcare organization, government agency, or NGO to implement sustainable health system improvements.",
      commitment: "Long-term collaboration",
      type: "Strategic Partnership",
      action: "Explore Partnership",
    },
    {
      icon: GraduationCap,
      title: "Academic Collaboration",
      description:
        "Collaborate on research projects, training programs, and knowledge sharing initiatives with our academic partners.",
      commitment: "Project-based",
      type: "Academic Partnership",
      action: "Start Collaboration",
    },
    {
      icon: Users,
      title: "Community Engagement",
      description:
        "Support community-based health initiatives and help us understand local health needs and challenges.",
      commitment: "Community-based",
      type: "Community Partnership",
      action: "Get Involved",
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
                Get Involved with Our Mission
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Join us in transforming healthcare systems across the Asia-Pacific region. Whether you're a healthcare
                professional, organization, or community member, there are many ways to contribute to our mission.
              </p>
            </div>
          </div>
        </section>

        {/* Opportunities */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Ways to Get Involved</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Choose the involvement level that matches your expertise, availability, and passion for healthcare
                improvement.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {opportunities.map((opportunity, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <opportunity.icon className="h-8 w-8 text-primary" />
                      <Badge variant="secondary">{opportunity.type}</Badge>
                    </div>
                    <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                    <CardDescription className="text-base">{opportunity.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Commitment:</span> {opportunity.commitment}
                      </p>
                    </div>
                    <Button className="w-full group">
                      {opportunity.action}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-card rounded-lg p-8 border">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Make a Difference?</h2>
              <p className="text-lg text-muted-foreground mb-6 text-pretty">
                Contact us to discuss how you can contribute to improving healthcare systems across the Asia-Pacific
                region. We'll work with you to find the right opportunity that matches your skills and interests.
              </p>
              <Button size="lg" className="group">
                Contact Us Today
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
