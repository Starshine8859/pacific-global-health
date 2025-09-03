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
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
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
            return (
              <div key={index} className="text-center space-y-4">
                <div className={`w-20 h-20 rounded-full ${service.bgColor} flex items-center justify-center mx-auto`}>
                  <Icon className={`h-10 w-10 ${service.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                <p className="text-gray-600 text-pretty leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
