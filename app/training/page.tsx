import type { Metadata } from "next"
import TrainingPageClient from "./training-client"

export const metadata: Metadata = {
  title: "Healthcare Training Programs | Medical Internships & Scholarships",
  description: "Join Pacific Global Health's comprehensive healthcare training programs including medical internships, electives, scholarships, and professional development opportunities across the Asia-Pacific region. Build your global healthcare career.",
  keywords: [
    "medical internships",
    "healthcare training programs",
    "medical electives",
    "healthcare scholarships",
    "medical education",
    "healthcare workforce development",
    "global health training",
    "medical professional development",
    "healthcare capacity building",
    "Asia-Pacific medical training",
    "pacific global health"
  ],
  openGraph: {
    title: "Healthcare Training Programs | Medical Internships & Scholarships",
    description: "Join Pacific Global Health's comprehensive healthcare training programs including medical internships, electives, scholarships, and professional development opportunities across the Asia-Pacific region.",
    url: 'https://pacificglobalhealth.org/training',
    images: [
      {
        url: '/images/training.png',
        width: 1200,
        height: 630,
        alt: 'Healthcare Training Programs - Pacific Global Health',
      },
    ],
  },
  alternates: {
    canonical: '/training',
  },
}

export default function TrainingPage() {
  return <TrainingPageClient />
}