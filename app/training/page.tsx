"use client"

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
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                Training & Workforce Development
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Building Global Healthcare Capacity
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mb-6">
                At Pacific Global Health, we believe that knowledge sharing and cross-border collaboration are key to building stronger, more resilient health systems. Our dedicated platform connects healthcare workers and students worldwide through internships, scholarships, and elective opportunities.
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
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

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Training Programs</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Connecting healthcare professionals globally through structured learning opportunities
              </p>
            </div>

            <div className="max-w-3xl mx-auto mb-12 text-center">
              <p className="text-muted-foreground">
                Training enquiries: <a href="mailto:training@pacificglobalhealth.org" className="text-primary underline">training@pacificglobalhealth.org</a>
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Internships</h3>
                <p className="text-muted-foreground text-sm">
                  Hands-on experience in healthcare settings across the Asia-Pacific region
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Scholarships</h3>
                <p className="text-muted-foreground text-sm">
                  Financial support for healthcare education and professional development
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Electives</h3>
                <p className="text-muted-foreground text-sm">
                  Specialized training modules in various healthcare disciplines
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Mentorship</h3>
                <p className="text-muted-foreground text-sm">
                  Guidance from experienced healthcare professionals and researchers
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-96">
                <Image
                  src="/healthcare-training-in-pacific-islands.png"
                  alt="Healthcare training in Pacific Islands"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Professional Development Excellence</h2>
                <p className="text-lg text-muted-foreground mb-6 text-pretty">
                  Our comprehensive training approach focuses on building local capacity and expertise to ensure
                  sustainable healthcare improvements across diverse healthcare settings.
                </p>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Skills Development</h3>
                      <p className="text-muted-foreground">
                        Enhancing clinical and administrative capabilities through structured programs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Knowledge Transfer</h3>
                      <p className="text-muted-foreground">
                        Sharing best practices and innovations across healthcare systems
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="express-interest" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Express Your Interest</h2>
              <p className="text-lg text-muted-foreground">
                We invite healthcare workers, students, and institutions to join us in shaping this exciting initiative. If you are passionate about learning, teaching, or contributing to global health, please register your Expression of Interest below.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  <span>Application submitted successfully! We'll review your application and get back to you within 5-7 business days.</span>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-800">
                  <AlertCircle className="h-5 w-5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name" 
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address" 
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telephone Number *</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      type="tel" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number" 
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="program">Program of Interest *</Label>
                    <select
                      id="program"
                      name="program"
                      value={formData.program}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
                  <Label htmlFor="inquiry">Your Inquiry *</Label>
                  <Textarea
                    id="inquiry"
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleInputChange}
                    placeholder="Please describe your background, interests, and what you hope to achieve through our programs..."
                    rows={6}
                    required
                    disabled={isSubmitting}
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
                      'Submit Application'
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