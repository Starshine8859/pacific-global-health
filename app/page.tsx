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
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden">
      {/* Main content */}
      <div className="p-8">
        <div className="grid lg:grid-cols-3 gap-4 items-start">
          {/* Profile Image */}
          <div className="lg:col-span-1 flex justify-center items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative w-[220px] rounded-xl overflow-hidden shadow-lg flex justify-center items-center">
                <img
                  src="/images/IMG_9322.jpeg"
                  alt="Dr. Sathira Kasun Perera"
                  className="w-full h-auto object-cover object-center select-none transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Name and Title */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                Dr. Sathira Kasun Perera
              </h2>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <p className="text-xl text-blue-700 font-semibold">
                  Founder, Director, and Academic Lead
                </p>
              </div>
            </div>

            {/* Qualifications */}
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

            {/* Bio */}
            <div className="space-y-3">
              <div className="h-px bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200"></div>
              <p className="text-slate-600 leading-relaxed text-lg">
                Dr Sathira Perera, Founder and Director of Pacific Global Health, is a primary care physician and health systems specialist whose interdisciplinary expertise in medicine, public health, health economics and policy drives his commitment to advancing equitable, evidence-based healthcare locally and globally.
              </p>
            </div>

            {/* Call to Action */}
            <div className="pt-2">
              <a 
                href="/leadership" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Read Full Profile
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
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
