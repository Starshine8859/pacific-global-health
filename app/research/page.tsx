import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Search, BarChart } from "lucide-react"
import Image from "next/image"

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                Research
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Advancing Global Health Through Research
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mb-6">
                At Pacific Global Health, we recognise that research is the cornerstone of innovation and improvement in healthcare. To address today’s most pressing health challenges, collaboration across borders is essential. Our mission is to facilitate global research networking by creating opportunities for researchers, institutions, and professionals to connect, share expertise, and drive impactful projects together.
              </p>
              <div className="mt-8">
                <a
                  href="#express-interest"
                  className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-primary/90 transition"
                >
                  Register Your Expression of Interest
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Research Scope</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Pacific Global Health supports research across multiple domains to drive innovation and improve health outcomes worldwide.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                <Search className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-grey-600 ">Clinical Research</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Supporting evidence-based medical practices that improve patient care and treatment outcomes.
                </p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                <BarChart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-grey-600">Public Health Research</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Addressing community and population health challenges, from disease prevention to policy interventions.
                </p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                <Search className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-grey-600">Health Systems Research</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Exploring ways to strengthen efficiency, equity, and sustainability of healthcare delivery worldwide.
                </p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                <BarChart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-grey-600">Translational Research</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Bridging the gap between laboratory discoveries and real-world application for rapid impact.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Collaboration & Support</h2>
                <p className="text-lg text-muted-foreground mb-6 text-pretty">
                  Through resources, consultancy services, and knowledge exchange, Pacific Global Health provides the foundation for meaningful research collaboration. Whether it is guidance on study design, assistance in securing resources, or building partnerships between institutions, we serve as both a knowledge hub and an implementation partner.
                </p>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <Search className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Knowledge Exchange</h3>
                      <p className="text-muted-foreground">
                        Connecting researchers and institutions to share expertise and drive impactful projects.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BarChart className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Implementation Support</h3>
                      <p className="text-muted-foreground">
                        Providing consultancy, resources, and partnership-building for research success.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-96">
                <Image
                  src="/health-systems-research.png"
                  alt="Health research"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="express-interest" className="py-16 bg-gray-50 dark:bg-gray-900" style={{ display: "none" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Express Your Interest</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We invite prospective researchers, academic institutions, and healthcare professionals to join our global network. By working together, we can generate insights that not only advance science but also transform health systems and improve lives across the globe.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="font-medium text-grey-600 dark:text-grey-400">Full Name *</label>
                    <input
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="font-medium text-grey-600 dark:text-grey-400">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="affiliation" className="font-medium text-grey-600 dark:text-grey-400">Affiliation / Institution</label>
                  <input
                    id="affiliation"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter your affiliation or institution"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="interest" className="font-medium text-grey-600 dark:text-grey-400">Research Interest *</label>
                  <textarea
                    id="interest"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-vertical"
                    placeholder="Describe your research interests, expertise, or the type of collaboration you seek..."
                    rows={5}
                    required
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    Submit Expression of Interest
                  </button>
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