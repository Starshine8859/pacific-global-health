import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import bcrypt from 'bcryptjs'

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)))
    const skip = (page - 1) * limit

    const collection = db.collection('users')
    const [total, items] = await Promise.all([
      collection.countDocuments({}),
      collection
        .find({})
        .project({ password: 0 }) // Exclude password from response
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
    ])

    return NextResponse.json({
      users: items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return NextResponse.json(
      { message: 'Failed to fetch users', error: 'SERVER_ERROR' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, email, password, role = 'user' } = await request.json()

    // Validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'Username, email, and password are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Role validation
    const validRoles = ['admin', 'user']
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { message: 'Invalid role. Must be admin or user' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({
      $or: [{ email: email.toLowerCase() }, { username }]
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email or username already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user document
    const userData = {
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: null
    }

    // Insert into users collection
    const result = await db.collection('users').insertOne(userData)

    console.log(`New user created: ${userData.username} (${userData.email}) - ${userData.role}`)

    return NextResponse.json(
      {
        message: 'User created successfully',
        success: true,
        userId: result.insertedId
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('User creation error:', error)
    
    return NextResponse.json(
      {
        message: 'Server error during user creation',
        error: 'SERVER_ERROR'
      },
      { status: 500 }
    )
  }
}
