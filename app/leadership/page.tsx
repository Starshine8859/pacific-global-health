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
                      {/* <Badge variant="outline">PhD</Badge> */}
                    </div>
                    <CardTitle className="text-3xl">Dr. Sathira Kasun Perera</CardTitle>
                    {/* <CardDescription className="text-lg text-primary font-medium">
                      Founder, Director & Academic Lead · also known as "Dr. Sathi"
                    </CardDescription> */}
                  </CardHeader>
                  <CardContent className="p-0 space-y-6">
                    <p className="text-muted-foreground text-pretty leading-relaxed">
                    Dr. Sathira Perera is the Founder, Director and the academic lead of the Pacific Global Health. 
Being a primary care physician and a health systems specialist whose work spans medicine, research, and policy, with his strong interdisciplinary background, Dr. Perera has dedicated his career to advancing health systems through evidence-based practice, innovative research, and strategic leadership. 
He holds qualifications in medicine, public health, health economics and health services research, including a Scientia PhD from the University of New South Wales. His research in Health Economics and Policy have positioned him to critically analyse healthcare financing, resource allocation, and policy reforms that impact health equity and access. His academic work reflects a strong commitment to bridging the gap between research and practice, ensuring that findings translate into meaningful improvements for communities and healthcare providers alike.
As an academic leader, Dr. Perera brings a unique blend of clinical insight, public health perspective, and policy acumen. His vision is to inspire collaboration, nurture future health professionals, and lead innovative initiatives that strengthen healthcare delivery both regionally and globally.

                    </p>

                    
                  </CardContent>
                </div>
              </div>
            </Card>

            {/* <div className="grid md:grid-cols-2 gap-8">
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
            </div> */}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}