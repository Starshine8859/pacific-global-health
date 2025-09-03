import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, GraduationCap, Heart, Users, Globe, BookOpen } from "lucide-react"
import Image from "next/image"

export default function LeadershipPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                Leadership
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Our Leadership Team</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Meet the experienced professionals leading Pacific Global Health's mission to transform healthcare
                systems across the Asia-Pacific region.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="overflow-hidden mb-12">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-96 lg:h-auto">
                  <Image
                    src="/images/dr-sathira-perera.jpg"
                    alt="Dr. Sathira Perera"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">MBBS, FRACGP, MPH</Badge>
                    </div>
                    <CardTitle className="text-3xl">Dr. Sathira Perera</CardTitle>
                    <CardDescription className="text-lg text-primary font-medium">
                      Founder & Chief Executive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 space-y-6">
                    <p className="text-muted-foreground text-pretty leading-relaxed">
                      Dr. Sathira Perera is a distinguished healthcare leader with extensive experience spanning primary
                      care, public health, and health systems development. As the founder of Pacific Global Health, he
                      brings a unique combination of clinical expertise, academic rigor, and strategic vision to address
                      complex healthcare challenges across the Asia-Pacific region.
                    </p>

                    <p className="text-muted-foreground text-pretty leading-relaxed">
                      With qualifications in medicine (MBBS), Fellowship of the Royal Australian College of General
                      Practitioners (FRACGP), and a Master of Public Health (MPH), Dr. Perera has dedicated his career
                      to improving healthcare access, quality, and sustainability across diverse communities and health
                      systems.
                    </p>

                    <div className="grid gap-4">
                      <div className="flex items-start gap-3">
                        <GraduationCap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Academic Qualifications</p>
                          <p className="text-sm text-muted-foreground">
                            MBBS, FRACGP, MPH - Comprehensive medical and public health training
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Professional Recognition</p>
                          <p className="text-sm text-muted-foreground">
                            Fellow of the Royal Australian College of General Practitioners
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Global Health Focus</p>
                          <p className="text-sm text-muted-foreground">
                            Specialized expertise in Asia-Pacific health systems development
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Mission-Driven Leadership</p>
                          <p className="text-sm text-muted-foreground">
                            Committed to sustainable healthcare transformation and capacity building
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">Vision & Approach</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-pretty leading-relaxed">
                    Dr. Perera's leadership philosophy centers on collaborative, evidence-based approaches to health
                    systems strengthening. He believes in empowering local healthcare professionals and institutions
                    while fostering international partnerships that drive sustainable improvements in health outcomes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">Leadership Impact</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-pretty leading-relaxed">
                    Under Dr. Perera's leadership, Pacific Global Health has established itself as a trusted partner in
                    health systems development, training, and research across the Asia-Pacific region, with a focus on
                    building local capacity and sustainable healthcare solutions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
