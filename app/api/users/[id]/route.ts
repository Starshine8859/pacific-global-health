import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcryptjs'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { db } = await connectToDatabase()
    const { id } = await params

    // Validate ObjectId
    let objectId: ObjectId
    try {
      objectId = new ObjectId(id)
    } catch {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 })
    }

    // Find the user
    const user = await db.collection('users').findOne(
      { _id: objectId },
      { projection: { password: 0 } } // Exclude password
    )
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Failed to get user:', error)
    return NextResponse.json(
      { message: 'Failed to get user', error: 'SERVER_ERROR' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { db } = await connectToDatabase()
    const { id } = await params
    const body = await request.json()

    // Validate ObjectId
    let objectId: ObjectId
    try {
      objectId = new ObjectId(id)
    } catch {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 })
    }

    // Check if user exists
    const existingUser = await db.collection('users').findOne({ _id: objectId })
    if (!existingUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date()
    }

    // Update fields if provided
    if (body.username) updateData.username = body.username.trim()
    if (body.email) {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      if (!emailRegex.test(body.email)) {
        return NextResponse.json({ message: 'Invalid email format' }, { status: 400 })
      }
      updateData.email = body.email.toLowerCase().trim()
    }
    if (body.role) {
      const validRoles = ['admin', 'user']
      if (!validRoles.includes(body.role)) {
        return NextResponse.json({ message: 'Invalid role' }, { status: 400 })
      }
      updateData.role = body.role
    }
    if (body.isActive !== undefined) updateData.isActive = body.isActive

    // Check for duplicate email/username if updating
    if (body.email || body.username) {
      const duplicateQuery: any = { _id: { $ne: objectId } }
      if (body.email) duplicateQuery.email = body.email.toLowerCase()
      if (body.username) duplicateQuery.username = body.username

      const duplicate = await db.collection('users').findOne(duplicateQuery)
      if (duplicate) {
        return NextResponse.json(
          { message: 'User with this email or username already exists' },
          { status: 409 }
        )
      }
    }

    // Update user
    const result = await db.collection('users').updateOne(
      { _id: objectId },
      { $set: updateData }
    )

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: 'No changes made' }, { status: 200 })
    }

    // Return updated user
    const updatedUser = await db.collection('users').findOne(
      { _id: objectId },
      { projection: { password: 0 } }
    )

    return NextResponse.json({ 
      message: 'User updated successfully',
      user: updatedUser 
    })

  } catch (error) {
    console.error('Failed to update user:', error)
    return NextResponse.json(
      { message: 'Failed to update user', error: 'SERVER_ERROR' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { db } = await connectToDatabase()
    const { id } = await params

    // Validate ObjectId
    let objectId: ObjectId
    try {
      objectId = new ObjectId(id)
    } catch {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 })
    }

    // Check if user exists
    const user = await db.collection('users').findOne({ _id: objectId })
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Delete user
    const result = await db.collection('users').deleteOne({ _id: objectId })

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    console.log(`User deleted: ${user.username} (${user.email})`)

    return NextResponse.json({ 
      message: 'User deleted successfully',
      success: true 
    })

  } catch (error) {
    console.error('Failed to delete user:', error)
    return NextResponse.json(
      { message: 'Failed to delete user', error: 'SERVER_ERROR' },
      { status: 500 }
    )
  }
}
