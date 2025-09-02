import Link from "next/link"
import Image from "next/image"
import { Heart, Mail, MapPin } from "lucide-react"

export function Footer() {
  const footerSections = [
    {
      title: "Services",
      links: [
        { href: "/primary-care", label: "Primary Care" },
        { href: "/partnerships", label: "Global Partnerships" },
        { href: "/systems-development", label: "Systems Development" },
        { href: "/training", label: "Training & Development" },
        { href: "/research", label: "Research" },
      ],
    },
    {
      title: "Organization",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/leadership", label: "Leadership" },
        { href: "/contact", label: "Contact Us" },
      ],
    },
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/pacific-global-health-logo.png"
                alt="Pacific Global Health"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-bold text-lg text-foreground">Pacific Global Health</span>
            </Link>
            <p className="text-muted-foreground text-pretty max-w-md">
              Building comprehensive health system improvement knowledge base and serving as a global think tank for
              innovative, sustainable solutions in healthcare.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-primary" />
              <span>Strengthening health systems across the Asia-Pacific region</span>
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2024 Pacific Global Health. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Asia-Pacific Region</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>Contact Us</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
