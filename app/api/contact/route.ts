import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)))
    const skip = (page - 1) * limit

    const collection = db.collection('contacts')
    const [total, items] = await Promise.all([
      collection.countDocuments({}),
      collection
        .find({})
        .project({ ipAddress: 0, userAgent: 0 })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
    ])

    return NextResponse.json({
      contacts: items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Failed to fetch contacts:', error)
    return NextResponse.json(
      { message: 'Failed to fetch contacts', error: 'SERVER_ERROR' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, organization, subject, message } = await request.json()

    // Validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        {
          message: 'First name, last name, email, subject, and message are required',
          error: 'MISSING_FIELDS'
        },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          message: 'Please enter a valid email address',
          error: 'INVALID_EMAIL'
        },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Create contact document
    const contactData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      organization: organization ? organization.trim() : undefined,
      subject: subject.trim(),
      message: message.trim(),
      status: 'new',
      opened: false,
      openedBy: null,
      openedAt: null,
      ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Insert into contacts collection
    const result = await db.collection('contacts').insertOne(contactData)

    console.log(`New contact form submitted: ${contactData.firstName} ${contactData.lastName} (${contactData.email})`)

    return NextResponse.json(
      {
        message: 'Contact form submitted successfully',
        success: true,
        contactId: result.insertedId
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    
    return NextResponse.json(
      {
        message: 'Server error during contact form submission',
        error: 'SERVER_ERROR'
      },
      { status: 500 }
    )
  }
}
