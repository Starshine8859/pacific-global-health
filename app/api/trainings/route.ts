import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)))
    const skip = (page - 1) * limit

    const collection = db.collection('training_applications')
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
      applications: items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Failed to fetch training applications:', error)
    return NextResponse.json(
      { message: 'Failed to fetch applications', error: 'SERVER_ERROR' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, program, inquiry } = await request.json()

    // Validation
    if (!name || !email || !phone || !program || !inquiry) {
      return NextResponse.json(
        {
          message: 'All fields are required',
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

    // Program validation
    const validPrograms = ['internship', 'elective', 'training', 'scholarship']
    if (!validPrograms.includes(program)) {
      return NextResponse.json(
        {
          message: 'Please select a valid program',
          error: 'INVALID_PROGRAM'
        },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Create training application document
    const applicationData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      program: program,
      inquiry: inquiry.trim(),
      status: 'new',
      opened: false,
      openedBy: null,
      openedAt: null,
      ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Insert into training_applications collection
    const result = await db.collection('training_applications').insertOne(applicationData)

    console.log(`New training application submitted: ${applicationData.name} (${applicationData.email}) - ${applicationData.program}`)

    return NextResponse.json(
      {
        message: 'Training application submitted successfully',
        success: true,
        applicationId: result.insertedId
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Training application error:', error)
    
    return NextResponse.json(
      {
        message: 'Server error during training application submission',
        error: 'SERVER_ERROR'
      },
      { status: 500 }
    )
  }
}
