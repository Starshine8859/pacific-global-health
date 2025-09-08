import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || password.length < 6) {
      return NextResponse.json({ error: "Invalid email or password too short" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const users = db.collection("users")

    const existing = await users.findOne({ email: normalizedEmail })
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const role = normalizedEmail === "admin@admin.com" ? "admin" : "user"
    const { insertedId } = await users.insertOne({ email: normalizedEmail, passwordHash, role, createdAt: new Date() })

    return NextResponse.json({ success: true, user: { id: String(insertedId), email: normalizedEmail, role } }, { status: 201 })
  } catch (error) {
    console.error("Register error", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}


