"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone, Clock, Send, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const response = await fetch('/api/contact', {
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
          firstName: '',
          lastName: '',
          email: '',
          organization: '',
          subject: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.message || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "info@pacificglobal.org",
      description: "Send us a message anytime",
    },
    {
      icon: MapPin,
      title: "Address",
      details: "Pacific Global Health, 200 Gilchrist Dr, Campbelltown NSW 2560",
      description: "Visit or write to our main office",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "1800 123 456 ",
      description: "Mon – Fri 09:00 to 16:00 (AEST)",
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "24-48 hours",
      description: "We'll get back to you quickly",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Contact Pacific Global Health
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Get in touch with us to learn more about our work, explore partnership opportunities, or discuss how we
                can support your healthcare initiatives.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <info.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium text-foreground mb-1">{info.details}</p>
                    <CardDescription>{info.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Send Us a Message</h2>
                <p className="text-lg text-muted-foreground mb-8 text-pretty">
                  Whether you're interested in our services, want to explore partnership opportunities, or have
                  questions about our work, we'd love to hear from you.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">General Inquiries</p>
                      <p className="text-muted-foreground">info@pacificglobal.org</p>
                    </div>
                  </div>

                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24-48 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-5 w-5" />
                      <span>Message sent successfully! We'll get back to you within 24-48 hours.</span>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-800">
                      <AlertCircle className="h-5 w-5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input 
                          id="firstName" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Enter your first name" 
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input 
                          id="lastName" 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Enter your last name" 
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
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
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization (Optional)</Label>
                      <Input 
                        id="organization" 
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        placeholder="Enter your organization name" 
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input 
                        id="subject" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is this regarding?" 
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your inquiry..."
                        className="min-h-[120px]"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full group" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
