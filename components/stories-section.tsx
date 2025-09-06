export function StoriesSection() {
  const stories = [
    {
      image: "/healthcare-training-in-pacific-islands.png",
      date: "",
      title: "Primary Care Services enhancement across Asia Pacific region",
      category: "",
    },
    {
      image: "/healthcare-partnership-meeting.png",
      date: "",
      title: "Health systems research, development and training.",
      category: "",
    },
    {
      image: "/healthcare-partnership-meeting.png",
      date: "",
      title: "Health Workforce Management Intervention",
      category: "",
    },
    {
      image: "/health-systems-research.png",
      date: "",
      title: "Facilitating Global Health Research and Innovation.",
      category: "",
    },
  ]

  return (
    <section className="py-14 sm:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 text-balance">Our Stories</h2>
          <p className="text-base md:text-xl text-gray-600 text-pretty max-w-4xl mx-auto leading-relaxed">
            
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {stories.map((story, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3 sm:mb-4">
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  className="w-full h-full object-cover sm:object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-gray-500 font-medium">{story.date}</p>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {story.title}
                </h3>
                <p className="text-xs sm:text-sm text-primary font-medium uppercase tracking-wide">{story.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
