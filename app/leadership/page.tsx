import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, GraduationCap, Heart, Users, Globe, BookOpen, Mail } from "lucide-react"
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
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Our Leadership </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
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
                    alt="Dr. Sathira Kasun Perera (Dr. Sathi)"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">MBBS (Hons)</Badge>
                      <Badge variant="outline">PhD</Badge>
                    </div>
                    <CardTitle className="text-3xl">Dr. Sathira Kasun Perera</CardTitle>
                    <CardDescription className="text-lg text-primary font-medium">
                      Founder, Director & Academic Lead · also known as "Dr. Sathi"
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 space-y-6">
                    <p className="text-muted-foreground text-pretty leading-relaxed">
                      Based in The Oaks, New South Wales, Australia, Dr. Perera is the Founder, Director and the academic lead of Pacific Global Health. A primary care physician and health systems specialist whose work spans medicine, research, and policy, he is dedicated to advancing health systems through evidence-based practice, innovative research, and strategic leadership.
                    </p>
                    <p className="text-muted-foreground text-pretty leading-relaxed">
                      Clinically, he serves as a General Practitioner at The Oaks Medical Practice and works part-time in the Emergency Departments at Campbelltown and Camden Hospitals.
                    </p>
                    <p className="text-muted-foreground text-pretty leading-relaxed">
                      He holds qualifications in medicine, public health, health economics and health services research, including a Scientia PhD from the University of New South Wales. His research in Health Economics and Policy focuses on healthcare financing, resource allocation, and policy reforms that impact health equity and access.
                    </p>
                    <p className="text-muted-foreground text-pretty leading-relaxed">
                      As an academic leader, Dr. Perera brings a unique blend of clinical insight, public health perspective, and policy acumen. His vision is to inspire collaboration, nurture future health professionals, and lead innovative initiatives that strengthen healthcare delivery both regionally and globally.
                    </p>
                    <div className="grid gap-4">
                      <div className="flex items-start gap-3">
                        <GraduationCap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Academic Qualifications</p>
                          <p className="text-sm text-muted-foreground">
                          MBBS (Hons) (University of Colombo); Diploma in Child Psychology (UK); Master of Community Medicine (University of Colombo); Master of Health Economics & Policy (University of Adelaide); Certificate in Emergency Medicine (ACEM); PhD in Cancer Therapy (UNSW)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Director Contact</p>
                          <p className="text-sm text-muted-foreground">director@pacificglobal.org</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Clinical Role</p>
                          <p className="text-sm text-muted-foreground">
                            General Practitioner at The Oaks Medical Practice; part-time Emergency Medicine at Campbelltown and Camden Hospitals
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Practice Location</p>
                          <p className="text-sm text-muted-foreground">The Oaks, NSW, Australia</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Global Health Focus</p>
                          <p className="text-sm text-muted-foreground">
                            Specialised expertise in Asia-Pacific health systems development, health policy and research translation
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Mission-Driven Leadership</p>
                          <p className="text-sm text-muted-foreground">
                            Committed to sustainable healthcare transformation, capacity building, and nurturing future leaders
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Special Interests</p>
                          <p className="text-sm text-muted-foreground">General medicine, paediatrics, cancer therapy, nutrition, emergency medicine</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Research Contributions</p>
                          <p className="text-sm text-muted-foreground">
                            Lead author (UNSW) on a Lancet Oncology study projecting significant rise in global demand for cancer surgery by 2040; informs health technology assessment and resource allocation strategies
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
                    Dr. Perera’s leadership philosophy centres on collaborative, evidence-based approaches to health systems strengthening. He believes in empowering local healthcare professionals and institutions while fostering international partnerships that drive sustainable improvements in health outcomes.
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
                    Under Dr. Perera’s leadership, Pacific Global Health has established itself as a trusted partner in health systems development, training, and research across the Asia-Pacific region, with a focus on building local capacity and sustainable healthcare solutions.
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