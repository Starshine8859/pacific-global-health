export function StoriesSection() {
  const stories = [
    {
      image: "/healthcare-training-in-pacific-islands.png",
      date: "1ST SEPTEMBER 2024",
      title: "Better training for better futures",
      category: "TRAINING",
    },
    {
      image: "/children-receiving-healthcare-in-asia-pacific.png",
      date: "27TH AUGUST 2024",
      title: "Through the eyes of children",
      category: "HEALTH",
    },
    {
      image: "/healthcare-partnership-meeting.png",
      date: "20TH AUGUST 2024",
      title: "Former Socorro Craig Foster kicks off with partnership goals",
      category: "PARTNERSHIPS",
    },
    {
      image: "/health-systems-research.png",
      date: "12ND AUGUST 2024",
      title: "Every child in every conflict endures unimaginable horrors",
      category: "RESEARCH",
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 text-balance">Our stories</h2>
          <p className="text-xl text-gray-600 text-pretty max-w-4xl mx-auto leading-relaxed">
            Our stories paint a picture of the amazing work Pacific Global Health does around the world and explore some
            of the biggest issues facing healthcare systems today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 font-medium">{story.date}</p>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {story.title}
                </h3>
                <p className="text-sm text-primary font-medium uppercase tracking-wide">{story.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
