import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcryptjs'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { db } = await connectToDatabase()
    const { id } = await params
    const { currentPassword, newPassword } = await request.json()

    // Validation
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: 'Current password and new password are required' },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: 'New password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Validate ObjectId
    let objectId: ObjectId
    try {
      objectId = new ObjectId(id)
    } catch {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 })
    }

    // Find the user with password
    const user = await db.collection('users').findOne({ _id: objectId })
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { message: 'Current password is incorrect' },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12)

    // Update password
    const result = await db.collection('users').updateOne(
      { _id: objectId },
      {
        $set: {
          password: hashedNewPassword,
          updatedAt: new Date()
        }
      }
    )

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: 'Failed to update password' }, { status: 500 })
    }

    console.log(`Password updated for user: ${user.username} (${user.email})`)

    return NextResponse.json({ 
      message: 'Password updated successfully',
      success: true 
    })

  } catch (error) {
    console.error('Failed to update password:', error)
    return NextResponse.json(
      { message: 'Failed to update password', error: 'SERVER_ERROR' },
      { status: 500 }
    )
  }
}
