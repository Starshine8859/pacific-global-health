import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { GraduationCap, BookOpen, Users, Award } from "lucide-react"
import Image from "next/image"

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                Training & Workforce Development
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Building Global Healthcare Capacity
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mb-6">
                At Pacific Global Health, we believe that knowledge sharing and cross-border collaboration are key to building stronger, more resilient health systems. Our dedicated platform connects healthcare workers and students worldwide through internships, scholarships, and elective opportunities.
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
                This initiative fosters global learning, cultural exchange, and professional growth. By providing access to structured placements across diverse healthcare settings, we empower participants to experience firsthand the challenges and innovations shaping health systems around the world. These opportunities build clinical and research skills, promote empathy, adaptability, and leadership—qualities essential for the next generation of health professionals.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="px-8">
                  <a href="#express-interest">Register Your Expression of Interest</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Training Programs</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Connecting healthcare professionals globally through structured learning opportunities
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Internships</h3>
                <p className="text-muted-foreground text-sm">
                  Hands-on experience in healthcare settings across the Asia-Pacific region
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Scholarships</h3>
                <p className="text-muted-foreground text-sm">
                  Financial support for healthcare education and professional development
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Electives</h3>
                <p className="text-muted-foreground text-sm">
                  Specialized training modules in various healthcare disciplines
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Mentorship</h3>
                <p className="text-muted-foreground text-sm">
                  Guidance from experienced healthcare professionals and researchers
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-96">
                <Image
                  src="/healthcare-training-in-pacific-islands.png"
                  alt="Healthcare training in Pacific Islands"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Professional Development Excellence</h2>
                <p className="text-lg text-muted-foreground mb-6 text-pretty">
                  Our comprehensive training approach focuses on building local capacity and expertise to ensure
                  sustainable healthcare improvements across diverse healthcare settings.
                </p>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Skills Development</h3>
                      <p className="text-muted-foreground">
                        Enhancing clinical and administrative capabilities through structured programs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Knowledge Transfer</h3>
                      <p className="text-muted-foreground">
                        Sharing best practices and innovations across healthcare systems
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="express-interest" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Express Your Interest</h2>
              <p className="text-lg text-muted-foreground">
                We invite healthcare workers, students, and institutions to join us in shaping this exciting initiative. If you are passionate about learning, teaching, or contributing to global health, please register your Expression of Interest below.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="Enter your full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="Enter your email address" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telephone Number *</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="program">Program of Interest</Label>
                    <select
                      id="program"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a program</option>
                      <option value="internship">Internship</option>
                      <option value="elective">Elective</option>
                      <option value="training">Training Program</option>
                      <option value="scholarship">Scholarship</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiry">Your Inquiry *</Label>
                  <Textarea
                    id="inquiry"
                    placeholder="Please describe your background, interests, and what you hope to achieve through our programs..."
                    rows={6}
                    required
                  />
                </div>

                <div className="text-center">
                  <Button type="submit" size="lg" className="px-8">
                    Submit Application
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}