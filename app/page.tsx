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
              <div className="relative h-40 w-40 mx-auto rounded-full overflow-hidden md:mx-0">
                <img
                  src="/images/dr-sathira-perera.jpg"
                  alt="Dr. Sathira Kasun Perera"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Dr. Sathira Kasun Perera</h2>
                <p className="text-primary font-medium">Founder, Director & Academic Lead</p>
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
