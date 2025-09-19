export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pacific Global Health",
    "alternateName": "PGH",
    "description": "Building comprehensive health system improvement knowledge base and serving as a global think tank for innovative, sustainable solutions in healthcare across the Asia-Pacific region.",
    "url": "https://pacificglobalhealth.org",
    "logo": "https://pacificglobalhealth.org/icon.png",
    "image": "https://pacificglobalhealth.org/icon.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "200 Gilchrist Dr",
      "addressLocality": "Campbelltown",
      "addressRegion": "NSW",
      "postalCode": "2560",
      "addressCountry": "AU"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+61-1300-228-150",
      "contactType": "customer service",
      "email": "info@pacificglobalhealth.org",
      "availableLanguage": "English"
    },
    "founder": {
      "@type": "Person",
      "name": "Dr. Sathira Kasun Perera",
      "jobTitle": "Founder, Director, and Academic Lead",
      "description": "Primary care physician and health systems specialist with interdisciplinary expertise in medicine, public health, health economics and policy.",
      "hasCredential": [
        "MBBS (Hons)",
        "Master of Community Medicine", 
        "Master of Health Economics & Policy",
        "PhD Health Systems Research: Cancer Therapy (UNSW)"
      ]
    },
    "foundingDate": "2024",
    "slogan": "Improving Health Worldwide",
    "sameAs": [
      "https://pacificglobalhealth.org"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Healthcare Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Medical Training Programs",
            "description": "Comprehensive healthcare training including internships, electives, and professional development"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Healthcare Research",
            "description": "Evidence-based research and knowledge dissemination for health systems improvement"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Primary Care Enhancement",
            "description": "Strengthening primary care systems and community-driven healthcare"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Healthcare Partnerships", 
            "description": "Strategic partnerships for sustainable healthcare solutions"
          }
        }
      ]
    },
    "areaServed": {
      "@type": "Place",
      "name": "Asia-Pacific Region"
    },
    "knowsAbout": [
      "Global Health",
      "Health Systems",
      "Primary Care",
      "Medical Education",
      "Healthcare Training",
      "Public Health Research",
      "Health Policy",
      "Community Medicine",
      "Health Economics"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pacific Global Health",
    "alternateName": "PGH",
    "url": "https://pacificglobalhealth.org",
    "description": "Pacific Global Health - Health Systems Improvement | Global Healthcare Training & Research",
    "publisher": {
      "@type": "Organization",
      "name": "Pacific Global Health"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://pacificglobalhealth.org/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pacificglobalhealth.org"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </>
  )
}
