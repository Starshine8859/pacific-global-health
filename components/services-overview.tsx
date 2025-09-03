"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Users, Building2, GraduationCap, Search, Globe, UserCheck, Phone } from "lucide-react"

const services = [
  {
    icon: Building2,
    title: "Primary Care",
    description:
      "Strengthening the foundation of health systems by supporting accessible, patient-centred, and community-driven healthcare.",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
  },
  {
    icon: Globe,
    title: "Global Health Partnerships",
    description:
      "Building collaborative networks with governments, NGOs, and institutions to strengthen healthcare systems worldwide.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Systems Development",
    description:
      "Creating resilient health systems through innovation, collaboration, and evidence-based practice for sustainable healthcare.",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
  {
    icon: GraduationCap,
    title: "Training & Workforce Development",
    description:
      "Developing global platforms for internships, scholarships, and professional development opportunities for healthcare workers.",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Search,
    title: "Research",
    description:
      "Facilitating global research networking across clinical, public health, health systems, and translational research domains.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: UserCheck,
    title: "Leadership",
    description:
      "Academic and strategic leadership driving innovation in health systems through evidence-based practice and policy.",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: Heart,
    title: "Consultancy Services",
    description:
      "Offering tailored advice and solutions for governments, NGOs, and private sector partners to scale effective health interventions.",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    icon: Phone,
    title: "Contact & Engagement",
    description:
      "Connecting with stakeholders worldwide to build partnerships and collaborate on transformative healthcare initiatives.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
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

  return (
    <section className="py-20 lg:py-32 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16 animate-in fade-in slide-in-from-bottom duration-1000">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 text-balance">
            Building comprehensive health systems for the Asia-Pacific region
          </h2>
          <p className="text-xl text-gray-600 text-pretty max-w-4xl mx-auto leading-relaxed">
            We work across eight core functions to strengthen healthcare delivery, build capacity, and create
            sustainable solutions for healthier communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            const isVisible = visibleItems.includes(index)
            return (
              <div
                key={index}
                data-index={index}
                className={`text-center space-y-4 group cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                  isVisible ? "animate-in fade-in slide-in-from-bottom" : "opacity-0 translate-y-8"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-20 h-20 rounded-full ${service.bgColor} flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                >
                  <Icon
                    className={`h-10 w-10 ${service.color} transition-transform duration-300 group-hover:scale-110`}
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-pretty leading-relaxed transition-colors duration-300 group-hover:text-gray-800">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
