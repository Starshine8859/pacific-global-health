import { Heart, Users, Building2, GraduationCap } from "lucide-react"

const services = [
  {
    icon: Heart,
    title: "Health",
    description:
      "We improve the health of children and families so children no longer die from preventable causes on their first birthday.",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "We create greater access to quality education and ensure that girls and boys get the education they need to build positive environments.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Protect",
    description:
      "We ensure children are safe at all times and prevent their exposure to violence, exploitation and abuse.",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
  {
    icon: Building2,
    title: "Support",
    description:
      "When disaster strikes, we ensure that children are given care and emotional support so they can continue to learn and live a normal life.",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
]

export function ServicesOverview() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 text-balance">
            Building comprehensive health systems for the Asia-Pacific region
          </h2>
          <p className="text-xl text-gray-600 text-pretty max-w-4xl mx-auto leading-relaxed">
            We work hard to protect healthcare systems from harm and help them access quality education and health
            services across the Pacific region.
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
