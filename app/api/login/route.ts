import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import bcrypt from 'bcryptjs'

// Function to log login attempts
async function logLoginAttempt(email: string, success: boolean, reason?: string) {
  try {
    const { db } = await connectToDatabase()
    const loginLogs = db.collection('login_logs')
    
    await loginLogs.insertOne({
      email: email.toLowerCase().trim(),
      success,
      reason: reason || (success ? 'Login successful' : 'Login failed'),
      timestamp: new Date(),
      ipAddress: 'unknown', // Could be extracted from request headers
      userAgent: 'unknown'  // Could be extracted from request headers
    })
  } catch (error) {
    console.error('Failed to log login attempt:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const users = db.collection("users")

    const user = await users.findOne({ email: email.toLowerCase().trim() })
    if (!user) {
      await logLoginAttempt(email, false, 'User not found')
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check if account is active (only for user role, admin can always login)
    if (user.role === 'user' && !user.isActive) {
      // Log failed login attempt for inactive user
      await logLoginAttempt(email, false, 'Account is deactivated')
      return NextResponse.json({ error: "Account is deactivated" }, { status: 401 })
    }

    // Support both legacy `password` field and current `passwordHash`
    const storedHash: string | undefined = user.passwordHash || user.password
    if (!storedHash || typeof storedHash !== 'string') {
      await logLoginAttempt(email, false, 'User has no password set')
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isMatch = await bcrypt.compare(password, storedHash)
    if (!isMatch) {
      await logLoginAttempt(email, false, 'Invalid password')
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Update last login
    await users.updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date() } }
    )

    // Log successful login
    await logLoginAttempt(email, true, 'Login successful')

    // Return user data with all required fields
    return NextResponse.json({ 
      success: true, 
      user: { 
        id: String(user._id), 
        username: user.username,
        email: user.email, 
        role: user.role || "user",
        createdAt: user.createdAt,
        lastLogin: new Date()
      } 
    })
  } catch (error) {
    console.error("Login error", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}