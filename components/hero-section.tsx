import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <video autoPlay loop muted playsInline className="w-auto h-auto max-w-full max-h-full object-contain">
          <source src="/videos/rotating-globe.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
            Building Healthier Futures Through Global Collaboration
          </h1>

          <p className="text-xl md:text-2xl text-white/90 text-pretty max-w-3xl mx-auto leading-relaxed">
            Pacific Global Health serves as a comprehensive health system improvement knowledge base and global think
            tank for innovative, sustainable healthcare solutions across the Asia-Pacific region and beyond.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg group">
              Explore Our Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg bg-transparent"
            >
              Learn About Our Mission
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
