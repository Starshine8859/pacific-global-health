import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, GraduationCap, HeartPulse, Network } from "lucide-react"
import Image from "next/image"

export default function PartnershipsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                Global Partnerships
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Global Health Partnerships
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Pacific Global Health is committed to advancing health equity and improving access to quality healthcare worldwide. Our partnerships reflect our belief that collaboration is the most powerful tool for addressing global health challenges.
              </p>
            </div>
          </div>
        </section>

        {/* Promotional Content Section */}
        <section className="relative py-12 bg-white dark:bg-background border-y border-primary/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Advancing Health Through Collaboration
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  By uniting expertise, resources, and innovation, we work with leading organizations to create sustainable solutions that improve lives across the Pacific region and beyond.
                </p>
                <h3 className="text-2xl font-semibold text-foreground mt-8 mb-2">Our Approach to Partnerships</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  We believe in partnerships built on trust, mutual respect, and shared goals. Whether with governments, NGOs, research institutions, or local health providers, we aim to strengthen healthcare systems and foster resilience. Our focus is on long-term collaboration, ensuring that every initiative contributes to stronger communities and lasting impact.
                </p>
              </div>
              <div className="flex-1 hidden md:block">
                <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/partnership.jpg"
                    alt="Partnership meeting"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Partnership Areas */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/0">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Key Partnership Areas</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <GraduationCap className="h-8 w-8 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Capacity Building</h3>
                  <p className="text-muted-foreground">Training healthcare professionals and supporting health workforce development.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Building2 className="h-8 w-8 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Health Systems Strengthening</h3>
                  <p className="text-muted-foreground">Collaborating with ministries of health to improve infrastructure, supply chains, and clinical governance.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Network className="h-8 w-8 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Innovation & Research</h3>
                  <p className="text-muted-foreground">Partnering with universities and research bodies to apply evidence-based solutions to pressing health issues.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <HeartPulse className="h-8 w-8 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Community Health Programs</h3>
                  <p className="text-muted-foreground">Working with NGOs and local organizations to deliver grassroots health services in underserved areas.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current Global Partnerships */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Current Global Partnerships</h2>
            <p className="text-lg text-muted-foreground mb-8 text-center">
              Pacific Global Health works with partners across Australia, Southeast Asia, and the wider Pacific. Our collaborations include joint projects on maternal and child health, infectious disease control, chronic disease management, and digital health innovations. Each partnership is designed to address region-specific health priorities while contributing to global health security.
            </p>
            <div className="flex justify-center">
              {/* <Image
                src="/global-partnerships-map.png"
                alt="Global partnerships map"
                width={600}
                height={320}
                className="rounded-lg shadow-md object-cover"
              /> */}
            </div>
          </div>
        </section>

        {/* Looking Ahead */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/0">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">Looking Ahead</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Our vision is a healthier, more connected world where no community is left behind. By building and expanding global partnerships, Pacific Global Health continues to play a vital role in shaping the future of healthcare across borders.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}