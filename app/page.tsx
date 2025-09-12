import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ImageSlideshow } from "@/components/image-slideshow"
import { ServicesOverview } from "@/components/services-overview"
import { LeadershipSection } from "@/components/leadership-section"
import { StoriesSection } from "@/components/stories-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ImageSlideshow />
        <ServicesOverview />
        {/* Founder Blurb */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 items-center bg-card border border-border rounded-xl p-6">
              <div className="relative h-40 w-40 mx-auto rounded-full overflow-hidden md:mx-0 ring-2 ring-primary/30 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <img
                  src="/images/dr-sathira-perera.jpg"
                  alt="Dr. Sathira Kasun Perera"
                  className="w-full h-full object-cover select-none"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Dr. Sathira Kasun Perera</h2>
                
                <p className="text-lg text-primary font-medium">Founder and Director of Pacific Global Health</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs">MBBS (Hons)</span>
                  <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs">Master of Community Medicine</span>
                  <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs">Master of Health Economics & Policy</span>
                  <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs">PhD Health Systems Research: Cancer Therapy (UNSW)</span>
                  {/* <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs">Founder, Director and Academic Lead</span> */}
                </div>
                
                <p className="text-muted-foreground text-pretty">
                Dr Sathira Perera, Founder and Director of Pacific Global Health, is a primary care physician and health systems specialist whose interdisciplinary expertise in medicine, public health, health economics and policy drives his commitment to advancing equitable, evidence-based healthcare locally and globally.
                </p>
                <div>
                  <a href="/leadership" className="text-primary hover:underline">Read full profile →</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <LeadershipSection />
        <StoriesSection />
      </main>
      <Footer />
    </div>
  )
}
