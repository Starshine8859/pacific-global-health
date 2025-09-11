import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { db } = await connectToDatabase()
    const { id } = await params

    // Validate ObjectId
    let objectId: ObjectId
    try {
      objectId = new ObjectId(id)
    } catch {
      return NextResponse.json({ message: 'Invalid application ID' }, { status: 400 })
    }

    // Find the training application
    const application = await db.collection('training_applications').findOne({ _id: objectId })
    
    if (!application) {
      return NextResponse.json({ message: 'Training application not found' }, { status: 404 })
    }

    // Always update openedBy and openedAt when Details is called
    const now = new Date()
    const userInfo = {
      id: 'admin-user',
      username: 'admin',
      email: 'admin@pacificglobalhealth.org'
    }

    await db.collection('training_applications').updateOne(
      { _id: objectId },
      {
        $set: {
          opened: true,
          openedBy: userInfo,
          openedAt: now,
          updatedAt: now
        }
      }
    )

    // Return updated application
    const updatedApplication = await db.collection('training_applications').findOne({ _id: objectId })
    return NextResponse.json({ application: updatedApplication })
  } catch (error) {
    console.error('Failed to get training application:', error)
    return NextResponse.json(
      { message: 'Failed to get training application', error: 'SERVER_ERROR' },
      { status: 500 }
    )
  }
}
