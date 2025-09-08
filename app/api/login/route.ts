import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const users = db.collection("users")

    const user = await users.findOne({ email: email.toLowerCase().trim() })
    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // For now, return a simple success response. You can extend with JWT/session.
    return NextResponse.json({ success: true, user: { id: String(user._id), email: user.email, role: user.role || "user" } })
  } catch (error) {
    console.error("Login error", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}


