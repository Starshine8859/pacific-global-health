"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Users, Building2, GraduationCap, Search, Globe, UserCheck, Phone } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Building2,
    title: "Primary Care",
    description:
      "Strengthening the foundation of health systems by supporting accessible, patient-centred, and community-driven healthcare. We design and implement innovative primary care models focused on prevention, early diagnosis, and continuity of care—improving outcomes and building sustainable, equitable systems for the future.",
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
    href: "/primary-care",
  },
  {
    icon: Globe,
    title: "Global Health Partnerships",
    description:
      "Advancing health equity and improving access to quality healthcare worldwide through trusted partnerships. We collaborate with governments, NGOs, research institutions, and local providers to build capacity, strengthen systems, and deliver sustainable solutions for healthier communities.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    href: "/partnerships",
  },
  {
    icon: Users,
    title: "Systems Development",
    description:
      "Helping countries and communities strengthen the foundations of healthcare delivery by combining innovation, collaboration, and evidence-based practice. We support primary care, drive research, provide consultancy, and mobilise resources to build resilient, adaptive health systems.",
    color: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-50 dark:bg-teal-900/20",
    href: "/systems-development",
  },
  {
    icon: GraduationCap,
    title: "Training & Workforce Development",
    description:
      "Fostering global learning, cultural exchange, and professional growth through a dedicated platform for internships, scholarships, and electives. We connect healthcare workers and students worldwide, building clinical and research skills, empathy, adaptability, and leadership for the next generation.",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    href: "/training",
  },
  {
    icon: Search,
    title: "Research",
    description:
      "Facilitating global research networking and collaboration across clinical, public health, systems, and translational research. We provide resources, consultancy, and knowledge exchange to drive impactful projects that advance science and transform health systems.",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    href: "/research",
  },
  {
    icon: UserCheck,
    title: "Leadership",
    description:
      "Dr. Sathira Perera, Founder, Director, and Academic Lead, brings a unique blend of clinical, research, and policy expertise. His vision inspires collaboration, nurtures future health professionals, and leads innovative initiatives to strengthen healthcare delivery regionally and globally.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    href: "/leadership",
  },
  {
    icon: Heart,
    title: "Consultancy Services",
    description:
      "Offering tailored advice and solutions for governments, NGOs, and private sector partners to design, evaluate, and scale effective health interventions. Our consultancy blends global expertise with local insights for sustainable impact.",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    href: "/contact",
  },
  {
    icon: Phone,
    title: "Contact & Engagement",
    description:
      "Connect with Pacific Global Health to explore partnership opportunities, access our services, or learn more about our mission to strengthen health systems across the Asia-Pacific region and beyond.",
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    href: "/contact",
  },
]

export function ServicesOverview() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleItems((prev) => [...prev, index])
          }
        })
      },
      { threshold: 0.1 },
    )

    const items = sectionRef.current?.querySelectorAll("[data-index]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  const handleServiceClick = (href: string) => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }

  return (
    <section id="services" className="py-20 lg:py-32 bg-white dark:bg-gray-900 perspective-1000" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16 animate-in fade-in slide-in-from-bottom duration-1000">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white text-balance">
            Building comprehensive health system improvement for the Asia-Pacific region
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-pretty max-w-4xl mx-auto leading-relaxed">
            We work across eight core functions to strengthen healthcare delivery, build capacity, and create sustainable solutions for healthier communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            const isVisible = visibleItems.includes(index)
            return (
              <Link
                key={index}
                href={service.href}
                data-index={index}
                onClick={() => handleServiceClick(service.href)}
                className={`text-center space-y-4 group cursor-pointer transition-all duration-700 transform-gpu preserve-3d hover:rotate-y-6 hover:scale-105 hover:translate-z-4 h-full block ${
                  isVisible ? "animate-in fade-in slide-in-from-bottom" : "opacity-0 translate-y-8"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="relative transform-gpu preserve-3d transition-all duration-700 group-hover:rotate-x-2 group-hover:translate-z-2 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl transform translate-z-[-10px] opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg group-hover:shadow-2xl dark:shadow-gray-900/50 dark:group-hover:shadow-gray-900/70 transition-all duration-500 border border-gray-100 dark:border-gray-700 group-hover:border-gray-200 dark:group-hover:border-gray-600 h-full flex flex-col">
                    <div
                      className={`w-16 h-16 rounded-full ${service.bgColor} flex items-center justify-center mx-auto transition-all duration-500 transform-gpu preserve-3d group-hover:scale-110 group-hover:rotate-y-12 group-hover:translate-z-4 group-hover:shadow-xl mb-4`}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <Icon
                        className={`h-8 w-8 ${service.color} transition-all duration-500 transform-gpu group-hover:scale-110 group-hover:rotate-z-12 group-hover:translate-z-2`}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white transition-all duration-500 group-hover:text-primary group-hover:translate-z-2 transform-gpu mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 text-pretty leading-relaxed transition-all duration-500 group-hover:text-gray-800 dark:group-hover:text-gray-200 group-hover:translate-z-1 transform-gpu flex-grow">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}