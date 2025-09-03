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
        <LeadershipSection />
        <StoriesSection />
      </main>
      <Footer />
    </div>
  )
}
