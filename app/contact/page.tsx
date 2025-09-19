import type { Metadata } from "next"
import ContactPageClient from "./contact-client"

export const metadata: Metadata = {
  title: "Contact Pacific Global Health | Get in Touch",
  description: "Contact Pacific Global Health for healthcare partnerships, training inquiries, research collaborations, and general questions. Located in Campbelltown NSW, Australia. Quick response within 24-48 hours.",
  keywords: [
    "contact Pacific Global Health",
    "healthcare partnerships",
    "medical training inquiries",
    "health research collaboration",
    "global health contact",
    "Asia-Pacific healthcare",
    "healthcare organization contact",
    "medical education inquiries",
    "health systems consultation"
  ],
  openGraph: {
    title: "Contact Pacific Global Health | Get in Touch",
    description: "Contact Pacific Global Health for healthcare partnerships, training inquiries, research collaborations, and general questions. Quick response within 24-48 hours.",
    url: 'https://pacificglobalhealth.org/contact',
    images: [
      {
        url: '/images/partnership.png',
        width: 1200,
        height: 630,
        alt: 'Contact Pacific Global Health',
      },
    ],
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}