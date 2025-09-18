import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { GraduationCap, BookOpen, Users, Award, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    inquiry: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/trainings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          program: '',
          inquiry: ''
        })
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.message || 'Failed to submit application. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <main>
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
                Training & Workforce Development
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 text-balance">
                Building Global Healthcare Capacity
              </h1>
              <p className="text-xl text-gray-900 dark:text-gray-300 max-w-3xl mx-auto text-pretty mb-6">
                At Pacific Global Health, we believe that knowledge sharing and cross-border collaboration are key to building stronger, more resilient health systems. Our dedicated platform connects healthcare workers and students worldwide through internships, scholarships, and elective opportunities.
              </p>
              <p className="text-lg text-gray-900 dark:text-gray-300 max-w-3xl mx-auto text-pretty">
                This initiative fosters global learning, cultural exchange, and professional growth. By providing access to structured placements across diverse healthcare settings, we empower participants to experience firsthand the challenges and innovations shaping health systems around the world. These opportunities build clinical and research skills, promote empathy, adaptability, and leadership—qualities essential for the next generation of health professionals.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="px-8">
                  <a href="#express-interest">Register Your Expression of Interest</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Training Programs</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Connecting healthcare professionals globally through structured learning opportunities
              </p>
            </div>

            <div className="max-w-3xl mx-auto mb-12 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Training enquiries: <a href="mailto:training@pacificglobalhealth.org" className="text-primary hover:text-primary/80 underline">training@pacificglobalhealth.org</a>
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Internships</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Hands-on experience in healthcare settings across the Asia-Pacific region
                </p>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Scholarships</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Financial support for healthcare education and professional development
                </p>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Electives</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Specialized training modules in various healthcare disciplines
                </p>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Mentorship</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Guidance from experienced healthcare professionals and researchers
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-96">
                <Image
                  src="/images/training.png"
                  alt="Healthcare training in Pacific Islands"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Professional Development Excellence</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 text-pretty">
                  Our comprehensive training approach focuses on building local capacity and expertise to ensure
                  sustainable healthcare improvements across diverse healthcare settings.
                </p>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Skills Development</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Enhancing clinical and administrative capabilities through structured programs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Knowledge Transfer</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Sharing best practices and innovations across healthcare systems
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="express-interest" className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Express Your Interest</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We invite healthcare workers, students, and institutions to join us in shaping this exciting initiative. If you are passionate about learning, teaching, or contributing to global health, please register your Expression of Interest below.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md flex items-center gap-2 text-green-800 dark:text-green-300">
                  <CheckCircle className="h-5 w-5" />
                  <span>Application submitted successfully! We'll review your application and get back to you within 5-7 business days.</span>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-center gap-2 text-red-800 dark:text-red-300">
                  <AlertCircle className="h-5 w-5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-900 dark:text-white">Full Name *</Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name" 
                      required
                      disabled={isSubmitting}
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-900 dark:text-white">Email Address *</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address" 
                      required
                      disabled={isSubmitting}
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-900 dark:text-white">Telephone Number *</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      type="tel" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number" 
                      required
                      disabled={isSubmitting}
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="program" className="text-gray-900 dark:text-white">Program of Interest *</Label>
                    <select
                      id="program"
                      name="program"
                      value={formData.program}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Select a program</option>
                      <option value="internship">Internship</option>
                      <option value="elective">Elective</option>
                      <option value="training">Training Program</option>
                      <option value="scholarship">Scholarship</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiry" className="text-gray-900 dark:text-white">Your Inquiry *</Label>
                  <Textarea
                    id="inquiry"
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleInputChange}
                    placeholder="Please describe your background, interests, and what you hope to achieve through our programs..."
                    rows={6}
                    required
                    disabled={isSubmitting}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>

                <div className="text-center">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="px-8" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}