import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password, username } = await request.json()

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const providedUsername = typeof username === 'string' ? username : ''
    const normalizedUsername = (providedUsername || normalizedEmail.split('@')[0]).trim()

    const { db } = await connectToDatabase()
    const users = db.collection("users")

    const existing = await users.findOne({ $or: [ { email: normalizedEmail }, { username: normalizedUsername } ] })
    if (existing) {
      const field = existing.email === normalizedEmail ? 'Email' : 'Username'
      return NextResponse.json({ error: `${field} already registered` }, { status: 409 })
    }

    // Determine activation: first user gets activated automatically; others default to inactive
    const existingUserCount = await users.countDocuments({})
    const isFirstUser = existingUserCount === 0

    const passwordHash = await bcrypt.hash(password, 10)
    // First user becomes admin; others are standard users
    const role = isFirstUser ? "admin" : "user"
    const isActive = isFirstUser ? true : false

    const { insertedId } = await users.insertOne({ 
      email: normalizedEmail,
      username: normalizedUsername,
      passwordHash,
      role,
      isActive,
      createdAt: new Date() 
    })

    return NextResponse.json({ success: true, user: { id: String(insertedId), email: normalizedEmail, username: normalizedUsername, role, isActive } }, { status: 201 })
  } catch (error) {
    console.error("Register error", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}


