import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, GraduationCap, Heart } from "lucide-react"
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-96 md:h-auto">
                  <Image
                    src="/professional-headshot-of-dr--sathira-perera.png"
                    alt="Dr. Sathira Perera"
                    fill
                    className="object-cover"
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
                  <CardContent className="p-0 space-y-4">
                    <p className="text-muted-foreground text-pretty">
                      Dr. Perera brings extensive experience in primary care, public health, and health systems
                      development. With qualifications in medicine, general practice, and public health, he has
                      dedicated his career to improving healthcare access and quality across diverse communities.
                    </p>
                    <div className="grid gap-3">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">MBBS, FRACGP, MPH</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Fellow of the Royal Australian College of General Practitioners
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Dedicated to health systems improvement</span>
                      </div>
                    </div>
                  </CardContent>
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
