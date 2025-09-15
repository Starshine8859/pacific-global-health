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
                <div className="relative h-80 sm:h-96 lg:h-full bg-black/5">
                  <Image
                    src="/images/IMG_9322.png"
                    alt="Dr. Sathira Kasun Perera (Dr. Sathi)"
                    fill
                    className="object-contain object-center"
                    priority
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-3xl">Dr. Sathira Kasun Perera</CardTitle>
                    <p className="text-lg text-primary font-medium">Founder, Director, and Academic Lead</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        MBBS (Hons)
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                        Master of Community Medicine
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        Master of Health Economics & Policy
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                        PhD Health Systems Research: Cancer Therapy (UNSW)
                      </span>
                    </div>
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}